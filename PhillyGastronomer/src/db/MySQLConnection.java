package db;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONObject;

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
}
