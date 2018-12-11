package db;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONObject;
import org.json.JSONArray;

import crawler.CleanPlates;
import entity.Item;
import entity.Item.ItemBuilder;
import external.HappyHourReader;
import external.WalkscoreAPI;
import external.YelpAPI;

public class MySQLConnection {
	
	private Connection conn;

	public MySQLConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();
			conn = DriverManager.getConnection(MySQLDBUtil.URL);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public void close() {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/** 
	 * Add an item to user's favorite
	 * @param userId
	 * @param itemIds
	 */
	public void setFavoriteItems(String userId, List<String> itemIds) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}

		try {
			String sql = "INSERT IGNORE INTO history(user_id, item_id) VALUES (?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, userId);
			for (String itemId : itemIds) {
				ps.setString(2, itemId);
				ps.execute();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/** 
	 * remove selected item from user's favorite 
	 * @param userId
	 * @param itemIds
	 */
	public void unsetFavoriteItems(String userId, List<String> itemIds) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}

		try {
			String sql = "DELETE FROM history WHERE user_id = ? AND item_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, userId);
			for (String itemId : itemIds) {
				ps.setString(2, itemId);
				ps.execute();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/** 
	 * auxiliary function to get id of faviorite items 
	 * @param userId
	 * @return set of item ids
	 */
	public Set<String> getFavoriteItemIds(String userId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<String> favoriteItemIds = new HashSet<>();
		try {
			String sql = "SELECT item_id FROM history WHERE user_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, userId);
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				favoriteItemIds.add(rs.getString("item_id"));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return favoriteItemIds;
	}

	
	/** 
	 * get a set of all user's favorite items 
	 * @param userId
	 * @return
	 */
	public Set<Item> getFavoriteItems(String userId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Item> favoriteItems = new HashSet<>();
		Set<String> favoriteItemIds = getFavoriteItemIds(userId);
		try {
			String sql = "SELECT * FROM items WHERE item_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			
			for (String itemId : favoriteItemIds) {
				ps.setString(1, itemId);
				ResultSet rs = ps.executeQuery();
				
				ItemBuilder builder = new ItemBuilder();
				while (rs.next()) {
					builder.setItemId(rs.getString("item_id"));
					builder.setName(rs.getString("name"));
					builder.setUrl(rs.getString("url"));
					builder.setImageUrl(rs.getString("image_url"));
					builder.setAddress(rs.getString("address"));
					builder.setRating(rs.getDouble("rating"));
					builder.setDistance(rs.getDouble("distance"));
					builder.setCategories(getCategories(itemId));
					
					favoriteItems.add(builder.build());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return favoriteItems;
	}
	
	/**
	 * get the categories of an item 
	 * @param itemId
	 * @return
	 */
	public Set<String> getCategories(String itemId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return null;
		}
		Set<String> categories = new HashSet<>();

		try {
			String sql = "SELECT category FROM categories WHERE item_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, itemId);
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				categories.add(rs.getString("category"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return categories;
	}

	/**
	 * search yelpAPI for restaurants based on user's current geo info
	 * @param lat
	 * @param lon
	 * @param term
	 * @return
	 */
	public List<Item> searchItems(double lat, double lon, String term) {
		// Connect to external API
		YelpAPI api = new YelpAPI();
		List<Item> items = api.search(lat, lon, term);
		for (Item item : items) {
			saveItem(item);
		}
		return items;
	}
	
	/** TODO: fetch user name from user database 
	 * 
	 * @param userId
	 * @return
	 */
	public String getFullname(String userId) {
		return null;
	}
	
	/** 
	 * TODO: do exact match of userId and pwd
	 * @param userId
	 * @param pwd
	 * @return
	 */
	public boolean verifyLogin(String userId, String pwd) {
		return false;
	}
	
	/**
	 * 
	 * @param term
	 * @return
	 * @throws FileNotFoundException 
	 */
	public List<Item> populateDatabase(InputStream file) throws FileNotFoundException {
		// Connect to external API
		YelpAPI api = new YelpAPI();
		WalkscoreAPI wkapi = new WalkscoreAPI();
		
		HappyHourReader hhr = new HappyHourReader(file);
		CleanPlates cp = new CleanPlates();
		List<Item> items = api.generalSearch("");
		for (Item item : items) {
			saveItem(item);
			saveWalkscore(item.getItemId(), wkapi.search(item.getCoordinates().get(0), item.getCoordinates().get(1), item.getAddress()));
			saveHappyHour(item.getItemId(), item.getAddress(), hhr);
			saveFoodQuality(item.getItemId(), item.getName(), item.getAddress(), cp);
		}
		return items;
	}
	
	/** 
	 * save item to database 
	 * @param item
	 */
	public void saveItem(Item item) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		// "SELECT * FROM users WHERE name = '" + userName + "' and pw = '"+ passWord +"';"
		// userName = "1' OR '1'='1";
		// passWord = "1' OR '1'='1";
		// "SELECT * FROM users WHERE name = '1' OR '1'='1' and pw = '1' OR '1'='1';"
		try {
			String sql = "INSERT IGNORE INTO items VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, item.getItemId());
			ps.setString(2, item.getName());
			ps.setDouble(3, item.getRating());
			ps.setInt(4, item.getPriceRange());
			ps.setString(5, item.getAddress());
			ps.setDouble(6, item.getCoordinates().get(0));
			ps.setDouble(7, item.getCoordinates().get(1));
			ps.setString(8, item.getUrl());
			ps.setString(9, item.getImageUrl());
			ps.setDouble(10, item.getDistance());
			ps.execute();

			sql = "INSERT IGNORE INTO categories VALUES(?, ?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, item.getItemId());
			for (String category : item.getCategories()) {
				ps.setString(2, category);
				ps.execute();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/** 
	 * save walkscore to database 
	 * @param id
	 * @param obj
	 */
	public void saveWalkscore(String id, JSONObject obj) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		
		try {
			String sql = "INSERT IGNORE INTO walkscore VALUES (?, ?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			ps.setInt(2, obj.getInt("walkscore"));
			if (!obj.isNull("bike")) {
				JSONObject bike = obj.getJSONObject("bike");
				ps.setDouble(3, bike.getInt("score"));
			}
			if (!obj.isNull("transit")) {
				JSONObject bike = obj.getJSONObject("transit");
				ps.setDouble(4, bike.getInt("score"));
			}
			ps.execute();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void saveHappyHour(String id, String address, HappyHourReader hhr) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		
		String itemStreet = address.split(",")[0];
		itemStreet = itemStreet.replace("\"", "");
		
		List<String> timeAndDetails = hhr.getTimeAndDetails(itemStreet);
		
		try {
			String sql = "INSERT IGNORE INTO happyhour VALUES (?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			if (timeAndDetails.size() != 0) {
				ps.setString(2, timeAndDetails.get(0));
				ps.setString(3, timeAndDetails.get(1));
				ps.execute();
			} 
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * save food quality to data base 
	 * @param id
	 * @param name
	 * @param address
	 * @param cp
	 */
	public void saveFoodQuality(String id, String name, String address, CleanPlates cp) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		
		String itemStreet = address.split(",")[0];
		itemStreet = itemStreet.replace("\"", "");
		
		name = name.replace(" ", "%20").toLowerCase();
		
		List<Integer> scores = cp.getFoodAndServiceQuality(name, itemStreet);
		
		try {
			String sql = "INSERT IGNORE INTO foodquality VALUES (?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			if (scores != null) {
				ps.setInt(2, scores.get(0));
				ps.setInt(3, scores.get(1));
				ps.execute();
			} 
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	/**
	 * 2. The query that obtains "Which restaurant has happy hour and when?"
	 * 
	 * @return the string of restaurant name
	 */
	public JSONArray getHappyHours() {
		PreparedStatement st = null;
		ResultSet rs = null;
		String sql = "SELECT r.name, hh.time " + 
				"FROM items r, happyhour hh " + 
				"WHERE r.item_id = hh.item_id";
		try {
			st = conn.prepareStatement(sql);
			rs = st.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
		 JSONArray array = new JSONArray();
		 try {
			 while(rs.next()) {
				 JSONObject obj = new JSONObject();
				 try {
					 obj.put("name", rs.getString("name"));
					 
					 obj.put("time", rs.getString("time"));
						
				 } catch (Exception e) {
					 e.printStackTrace();
				 }
				 array.put(obj);
			 }
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 return array;
		
	}

	/**
	 * List out the restaurants that is under user specified category and price
	 * range, and with food and service quality both under 3, in the ascending order
	 * of distance?
	 * 
	 * @return the tuples of restaurants name and price range
	 */
	public ResultSet getUserSpecifiedPriceRange() {
		return null;
	}

	/**
	 * Return the restaurant name and food and service quality according to the user
	 * specified category and price range.
	 * 
	 * @return the tuples (restaurant.name, fq.food_quality, fq.service_quality)
	 */
	public ResultSet getFoodAndServiceQuality() {
		return null;
	}

	/**
	 * Return the restaurant name that has high popularity, food quality, category
	 * (specified by users ) and have certain walk ability?
	 * 
	 * @return tuples(restaurant.name)
	 */
	public ResultSet getHighQualityRestaurant() {

		return null;
	}

	/**
	 * 6.Return the restaurant that is transit friendly within certain price range
	 * and category
	 * 
	 * @param priceRange the price range specified by users
	 * @param category   the category of restaurants specified by users
	 * @return
	 */
	public JSONArray getTransitFriendlyRestaurants(int priceRange, String category) {
		PreparedStatement st = null;
		ResultSet rs = null;
		String sql = "SELECT r.name, r.address " + 
				"FROM items r, walkscore w, categories c " + 
				"WHERE w.item_id = r.item_id AND price_range = ? AND c.category = ?";
		try {
			st = conn.prepareStatement(sql);
			st.setInt(1, priceRange);
			st.setString(2, category);
			rs = st.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		 try {
			 st = conn.prepareStatement(sql);
			 st.setInt(1, priceRange);
			 st.setString(2, category);
			 rs = st.executeQuery();
		 }catch (Exception e) {
			 e.printStackTrace();
		 }
		 JSONArray array = new JSONArray();
		 try {
			 while(rs.next()) {
				 JSONObject obj = new JSONObject();
				 try {
					 obj.put("name", rs.getString("name"));
					 String address = rs.getString("address").replaceAll("\\\'", ""); 
					 obj.put("address", address);
						
				 } catch (Exception e) {
					 e.printStackTrace();
				 }
				 array.put(obj);
			 }
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 return array;
	}

	/**
	  * Return all the walkable restaurants name and address and walk score 
	  * which is within the user specified price range
	  * @return the result tuples in JSON (name, address, walk_score)
	  */
	 public JSONArray getWalkableRestaurants(int priceRange, int walkScore){
		 PreparedStatement st = null;
		 ResultSet rs = null;
		 String sql = "SELECT DISTINCT r.name, r.address, w.walk_score " + 
		              "FROM items r, walkscore w " + 
				      "WHERE r.item_id = w.item_id AND r.price_range <= ? AND w.walk_score >= ?";
		 try {
			 st = conn.prepareStatement(sql);
			 st.setInt(1, priceRange);
			 st.setInt(2, walkScore);
			 rs = st.executeQuery();
		 }catch (Exception e) {
			 e.printStackTrace();
		 }
		 JSONArray array = new JSONArray();
		 try {
			 while(rs.next()) {
				 JSONObject obj = new JSONObject();
				 try {
					 obj.put("name", rs.getString("name"));
					 String address = rs.getString("address").replaceAll("\\\'", ""); 
					 obj.put("address", address);
					 obj.put("walk_score", rs.getInt("walk_score"));
						
				 } catch (Exception e) {
					 e.printStackTrace();
				 }
				 array.put(obj);
			 }
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 return array;
	 }
	 
	 public JSONObject searchById(String id) {
		 PreparedStatement[] sts = new PreparedStatement[5];
		 ResultSet[] rsArr = new ResultSet[5];
		 String[] sqls = {"SELECT * FROM items r WHERE r.item_id = ? ", 
                 "SELECT * FROM walkscore ws WHERE ws.item_id = ? ", 
                 "SELECT * FROM categories c WHERE c.item_id = ? ",  
                 "SELECT * FROM happyhour hh WHERE hh.item_id = ? ",  
                 "SELECT * FROM foodquality fq WHERE fq.item_id = ? "};
		 try {
			 for(int i = 0; i < 5; i++) {
				 sts[i] = conn.prepareStatement(sqls[i]);
					
				 sts[i].setString(1, id);
				 
				 rsArr[i] = sts[i].executeQuery();
			 }
			 
			// res = rs.getString("name");
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 JSONObject obj = new JSONObject();
		 try {
			 rsArr[0].next();
			 obj.put("name", rsArr[0].getString("name"));
			 obj.put("address", rsArr[0].getString("address"));
			 obj.put("rating", rsArr[0].getFloat("rating"));
			 obj.put("price_range", rsArr[0].getInt("price_range"));
			 obj.put("distance", rsArr[0].getFloat("distance"));
			 obj.put("latitude", rsArr[0].getFloat("latitude"));
			 obj.put("longitude", rsArr[0].getFloat("longitude"));
			 obj.put("url", rsArr[0].getString("url"));
			 obj.put("image_url", rsArr[0].getString("image_url"));
			 
			 if(rsArr[1].next()) {
				 obj.put("walk_score", rsArr[1].getInt("walk_score"));
				 obj.put("bike_score", rsArr[1].getInt("bike_score"));
				 obj.put("transit_score", rsArr[1].getInt("transit_score"));
			 }
			 
			 
			 if(rsArr[2].next()) {
				 obj.put("category", rsArr[2].getString("category"));
			 }
			 
			 
			 if(rsArr[3].next()) {
				 obj.put("happyhour", rsArr[3].getString("time"));
				 obj.put("details", rsArr[3].getString("details"));
			 }
			 
			 if(rsArr[4].next()) {
				 obj.put("food_quality", rsArr[4].getInt("food_quality"));
				 obj.put("service_quality", rsArr[4].getInt("service_quality"));
			 }
			
			// obj.put("food_quality", rs.getInt("food_quality"));
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 
		 return obj;
	 }
	 
	 public JSONArray searchRestaurant(String r) {
		 PreparedStatement[] sts = new PreparedStatement[5];
		 ResultSet[] rsArr = new ResultSet[5];
		 PreparedStatement inter = null;
		 ResultSet interResult = null;
         String selectItemId = "SELECT r.item_id FROM items r WHERE r.name = ?";
         String itemId = null;
         try {
        	 inter = conn.prepareStatement(selectItemId);
        	 inter.setString(1, r);
        	 interResult = inter.executeQuery();
        	 interResult.next();
        	 itemId = interResult.getString("item_id");
         }catch(Exception e) {
        	 e.printStackTrace();
         }
         

         String[] sqls = {"SELECT * FROM items r WHERE r.item_id = ? ", 
                       "SELECT * FROM walkscore ws WHERE ws.item_id = ? ", 
                       "SELECT * FROM categories c WHERE c.item_id = ? ",  
                       "SELECT * FROM happyhour hh WHERE hh.item_id = ? ",  
                       "SELECT * FROM foodquality fq WHERE fq.item_id = ? "};
        
		
         
		 String res = null;
		 try {
			 for(int i = 0; i < 5; i++) {
				 sts[i] = conn.prepareStatement(sqls[i]);
					
				 sts[i].setString(1, itemId);
				 
				 rsArr[i] = sts[i].executeQuery();
			 }
			 
			// res = rs.getString("name");
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 JSONArray array = new JSONArray();
		 JSONObject obj = new JSONObject();
		 try {
			 rsArr[0].next();
			 obj.put("name", rsArr[0].getString("name"));
			 obj.put("address", rsArr[0].getString("address"));
			 obj.put("rating", rsArr[0].getFloat("rating"));
			 obj.put("price_range", rsArr[0].getInt("price_range"));
			 obj.put("distance", rsArr[0].getFloat("distance"));
			 obj.put("latitude", rsArr[0].getFloat("latitude"));
			 obj.put("longitude", rsArr[0].getFloat("longitude"));
			 obj.put("url", rsArr[0].getString("url"));
			 obj.put("image_url", rsArr[0].getString("image_url"));
			 
			 if(rsArr[1].next()) {
				 obj.put("walk_score", rsArr[1].getInt("walk_score"));
				 obj.put("bike_score", rsArr[1].getInt("bike_score"));
				 obj.put("transit_score", rsArr[1].getInt("transit_score"));
			 }
			 
			 
			 if(rsArr[2].next()) {
				 obj.put("category", rsArr[2].getString("category"));
			 }
			 
			 
			 if(rsArr[3].next()) {
				 obj.put("happyhour", rsArr[3].getString("time"));
				 obj.put("details", rsArr[3].getString("details"));
			 }
			 
			 if(rsArr[4].next()) {
				 obj.put("food_quality", rsArr[4].getInt("food_quality"));
				 obj.put("service_quality", rsArr[4].getInt("service_quality"));
			 }
			 array.put(obj);
			// obj.put("food_quality", rs.getInt("food_quality"));
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 
		 return array;
	 }
	 
	 public JSONArray filter(Map<String, String> map, Set<String> set) {
		 PreparedStatement st = null;
		 ResultSet rs = null;
		
		 //String sql = "SELECT distinct r.name, r.address from items r, foodquality fq, categories c, walkscore ws, happyhour hh ";
		 String sql = "SELECT distinct r.item_id ";
		 String from = "FROM items r ";
		 String where = "WHERE ";
		 boolean whereAdded = false;
		 if(set.contains("happyhour")){
			 /*if(!whereAdded) {
				 sql += "where ";
				 whereAdded = true;
			 }*/
			 from += ", happyhour hh ";
			 //where += "hh.item_id = r.item_id and ";
			 // sql += "hh.item_id = r.item_id and ";
		 }
		 
		 if(set.contains("category")){
			 from += ", category c ";
			 where += "c.item_id = r.item_id and ";
			 
		 }
		 
		 if(set.contains("foodquality")){
			 from += ", foodquality fq ";
			 where += "fq.item_id = r.item_id and ";
			 
		 }
		 
		 if(set.contains("walkscore")){
			from += ", walkscore ws ";
			where += "ws.item_id = r.item_id and ";
		 }
		 
		 
		 List<Integer> parameters = new ArrayList<>();
		 
		 if(map.containsKey("rating")) {
			 
			 where += "r.rating = ? and ";
			 
			 parameters.add(Integer.parseInt(map.get("rating")));
			 System.out.println("sql:" + sql);
			 
			 
		 }
		
		 if(map.containsKey("price_range")) {
			
			 where += "r.price_range = ? and ";
			 parameters.add(Integer.parseInt(map.get("price_range")));
		 }
		 if(map.containsKey("food_quality")) {
			
			 
			 where += parseQuality(map.get("food_qaulity"), "fq.food_quality");
			 where += "and ";
			 
		 }
		 if(map.containsKey("service_quality")) {
			 
			 where += parseQuality(map.get("service_qaulity"), "fq.service_quality");
			 where += "and ";
		 }
		 
		 if(map.containsKey("walk_score")) {
			 
			 where += parseScore(map.get("walk_score"), "ws.walk_score");
			 where += "and ";
		 }
		 
		 if(map.containsKey("transit_score")) {
			 
			 where += parseScore(map.get("transit_score"), "ws.transit_score");
			 where += "and ";
		 }
		 
		 if(map.containsKey("bike_score")) {
			 
			 where += parseScore(map.get("bike_score"), "ws.bike_score");
			 where += "and ";
		 }
		 
		 
		 if(map.containsKey("category")) {
			 
			 where += "c.category = " + map.get("category") + " and ";
		 }
		 
		 if(map.containsKey("happy_hour")) {
			 if(map.get("happy_hour").equals("Yes")) {
				 where += "r.item_id IN (SELECT h.item_id FROM happyhour h) and ";
			 }else {
				 where += "r.item_id NOT IN (SELECT h.item_id FROM happyhour h) and ";
			 }
		 }
		 
		 //if(sql.substring(sql.length() - 4).equals("and ")) {
		 sql += from;
		 sql += where;
		 sql = sql.substring(0, sql.length() - 4);
		 //}
		 System.out.println(sql);
		 try {
			 st = conn.prepareStatement(sql);
			 for(int i = 1; i < parameters.size() + 1; i++) {
				 st.setInt(i, parameters.get(i - 1));
				 System.out.println("100");
			 }
			
			 rs = st.executeQuery();
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 
		 //JSONArray array = new JSONArray();
		 List<String> listOfIds = new ArrayList<>();
		 try {
			 while(rs.next()) {
				 JSONObject obj = new JSONObject();
				 try {
					 //obj.put("name", rs.getString("name"));
					 //String address = rs.getString("address").replaceAll("\\\'", ""); 
					 //obj.put("address", address);
					 
					 listOfIds.add(rs.getString("item_id"));
				 } catch (Exception e) {
					 e.printStackTrace();
				 }
				 //array.put(obj);
			 }
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 JSONArray array = new JSONArray();
		 for(String id: listOfIds) {
			 array.put(searchById(id));
		 }
		 
		 return array;
		 //localhost:8080/PhillyGastronomer/filter?priceRange=2
	 }
	 
	 public String parseQuality(String quality, String type) {
		 if(quality.equals("Below+3")) {
			 return type + " < 3 ";
		 }else if(quality.equals("3-5")) {
			 return type + " >= 3 and " + type + " <= 5 ";
		 }else if(quality.equals("6-10")) {
			 return type + " >= 6 and " + type + " <= 10 ";
		 }
		 return type + " >= 10 ";
	 }
	 
	 public String parseScore(String score, String type) {
		 if(score.equals("0-25")) {
			 return type + " >= 0 and " + type + " <= 25 ";
		 }else if(score.equals("25-50")) {
			 return type + " >= 25 and " + type + " <= 50 ";
		 }else if(score.equals("50-75")) {
			 return type + " <= 75 and " + type + " >= 50 ";
		 }
		 return type + " > 75 ";
	 }
	 
	 
	 public JSONArray selectCategory() {
		 JSONArray array = new JSONArray();
		 PreparedStatement st = null;
		 ResultSet rs = null;
		 String sql = "select distinct c.category from categories c";
		 try {
			 st = conn.prepareStatement(sql);
			 rs = st.executeQuery();
			 while(rs.next()) {
				 JSONObject obj = new JSONObject();
				 try {
					 obj.put("category", rs.getString("category"));
						
				 } catch (Exception e) {
					 e.printStackTrace();
				 }
				 array.put(obj);
			 }
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 
		 return array;
	 }
	 
	 public void createUser(List<String> columns) {
		 String sql = "INSERT IGNORE INTO users VALUES (?, ?, ?, ?)";
		 try {
			PreparedStatement ps = conn.prepareStatement(sql);
			int i = 1;
			for(String col: columns) {
				ps.setString(i, col);
				i++;
			}
			
			ps.execute();
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
	 }
}
