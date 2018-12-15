package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class testQuery {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		 try {
				// Step 1 Connect to MySQL.
			    
				MySQLConnection msc = new MySQLConnection();
				//JSONArray array = msc.getTransitFriendlyRestaurants(3, "italian");
				//JSONArray array = msc.searchRestaurant("Marathon");
				 //JSONArray array = msc.getWalkableRestaurants(2, 50);
				 //rs.next();
				Map<String, String> map = new HashMap<>();
				//map.put("rating", "5");
				//Set<String> set = new HashSet<>();
				//JSONArray array = msc.filter(map, set);
				boolean res = msc.verifyLogin("1111", "3229c1097c00d497a0fd282d586be");
				 int count = 0;
				 System.out.println(res);
				 System.out.println(count);
		 }catch (Exception e) {
				e.printStackTrace();
			}

	}

}
