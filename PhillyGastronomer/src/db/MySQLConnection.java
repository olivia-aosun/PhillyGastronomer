package db;

import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONObject;

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

	public Set<String> getFavoriteItemIds(String userId) {
		return null;
	}

	public Set<Item> getFavoriteItems(String userId) {
		return null;
	}

	public Set<String> getCategories(String itemId) {
		return null;
	}

	public List<Item> searchItems(double lat, double lon, String term) {
		// Connect to external API
		YelpAPI api = new YelpAPI();
		List<Item> items = api.search(lat, lon, term);
		for (Item item : items) {
			saveItem(item);
		}
		return items;
	}
	
	
	/**
	 * 
	 * @param term
	 * @return
	 * @throws FileNotFoundException 
	 */
	public List<Item> populateDatabase(String term) throws FileNotFoundException {
		// Connect to external API
		YelpAPI api = new YelpAPI();
		WalkscoreAPI wkapi = new WalkscoreAPI();
		HappyHourReader hhr = new HappyHourReader("../Web Crawler/HappyHour.csv");
		List<Item> items = api.generalSearch(term);
		for (Item item : items) {
			saveItem(item);
			saveWalkscore(item.getItemId(), wkapi.search(item.getCoordinates().get(0), item.getCoordinates().get(1), item.getAddress()));
			saveHappyHour(item.getItemId(), item.getAddress(), hhr);
		}
		return items;
	}

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
			}
			ps.execute();

		} catch (Exception e) {
			e.printStackTrace();
		}

		
	}
}
