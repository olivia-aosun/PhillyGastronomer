package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Item;
import entity.Item.ItemBuilder;

public class YelpAPI{
	private static final String HOST = "https://api.yelp.com";
	private static final String ENDPOINT = "/v3/businesses/search";
	private static final String DEFAULT_TERM = "restaurant";
	private static final int SEARCH_LIMIT = 20;

	private static final String TOKEN_TYPE = "Bearer";
	private static final String API_KEY = "61CL4Uz4nnD1Yjcom6WlWd4nHqUMO0KyhtVpLb-MnQezEUgOYBAGi3hG--jRiSJoz_r18CjCtPWHtIPCx9kGN9FKXZF9aDBadmeW3RFLjovRpLFKa2h8cpFm3KLnW3Yx";
	
	public List<Item> search(double lat, double lon, String term) {
		if (term == null || term.isEmpty()) {
 			term = DEFAULT_TERM;
 		}
 		
 		try {
			term = URLEncoder.encode(term, "UTF-8"); 
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
 		
 		String query = String.format("term=%s&latitude=%s&longitude=%s&limit=%s", term, lat, lon, SEARCH_LIMIT);
 		String url = HOST + ENDPOINT + "?" + query;
 		
 		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty("Authorization", TOKEN_TYPE + " " + API_KEY);
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to URL: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return new ArrayList<>();
			}
					
			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String inputLine = "";
			StringBuilder response = new StringBuilder();
			
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
			
			JSONObject obj = new JSONObject(response.toString());
			if (!obj.isNull("businesses")) {
				return getItem(obj.getJSONArray("businesses"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
 			
		return new ArrayList<>();
	}
	
	// general search to populate database with philly restaurants
	public List<Item> generalSearch(String term) {
		if (term == null || term.isEmpty()) {
 			term = DEFAULT_TERM;
 		}
 		
 		try {
			term = URLEncoder.encode(term, "UTF-8"); 
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
 		
 		int offset = 0;	
 		String query = String.format("term=%s&location=%s&limit=50&offset=%s", term, "Philadelphia", offset);
 		String url = HOST + ENDPOINT + "?" + query;
 		List<Item> list = new ArrayList<>();
 		
 		try {
 
 			do {
 				
 				HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
 				connection.setRequestMethod("GET");
 				connection.setRequestProperty("Authorization", TOKEN_TYPE + " " + API_KEY);
 				
 				int responseCode = connection.getResponseCode();
 				System.out.println("Sending request to URL: " + url);
 				System.out.println("Response code: " + responseCode);
 				
 				if (responseCode != 200) {
 					return list;
 				}
 						
 				BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
 				String inputLine = "";
 				StringBuilder response = new StringBuilder();
 				
 				while ((inputLine = in.readLine()) != null) {
 					response.append(inputLine);
 				}
 				in.close();
 				
 				JSONObject obj = new JSONObject(response.toString());
 				
 				if (!obj.isNull("businesses")) {
 					list.addAll(getItem(obj.getJSONArray("businesses")));
 				}
 				
 				offset += 50;
 				query = String.format("term=%s&location=%s&limit=50&offset=%s", term, "Philadelphia", offset);
 		 		url = HOST + ENDPOINT + "?" + query;
 				
 			} while (offset <= 1000);
			
			return list;
			
		} catch (Exception e) {
			e.printStackTrace();
		} 
 			
		return new ArrayList<>();
	}
	
	
	private List<Item> getItem(JSONArray restaurants) throws JSONException {
		List<Item> list = new ArrayList<>();
		for (int i = 0; i < restaurants.length(); i++) {
			JSONObject restaurant = restaurants.getJSONObject(i);
			ItemBuilder builder = new ItemBuilder();
			
			if (!restaurant.isNull("id")) {
				builder.setItemId(restaurant.getString("id"));
			}
			if (!restaurant.isNull("name")) {
				builder.setName(restaurant.getString("name"));
			}
			if (!restaurant.isNull("price")) {
				builder.setPriceRange(restaurant.getString("price").length());
			}
			if (!restaurant.isNull("url")) {
				builder.setUrl(restaurant.getString("url"));
			}
			if (!restaurant.isNull("image_url")) {
				builder.setImageUrl(restaurant.getString("image_url"));
			}
			if (!restaurant.isNull("distance")) {
				builder.setDistance(restaurant.getDouble("distance"));
			}
			if (!restaurant.isNull("rating")) {
				builder.setRating(restaurant.getDouble("rating"));
			}
			
			builder.setAddress(getAddress(restaurant));
			builder.setCategories(getCategories(restaurant));
			builder.setCoordinates(getCoordinates(restaurant));
			list.add(builder.build());
		}
		return list;
	}
	
	private String getAddress(JSONObject restaurant) throws JSONException{
		String address = "";
		
		if (!restaurant.isNull("location")) {
			JSONObject location = restaurant.getJSONObject("location");
			if (!location.isNull("display_address")) {
				JSONArray displayAddress = location.getJSONArray("display_address");
				address = displayAddress.join(",");
			}
		}
		return address;
	}
	
	private List<Double> getCoordinates(JSONObject restaurant) throws JSONException{
		double latitude = 0.0, longitude = 0.0;
		if (!restaurant.isNull("coordinates")) {
			JSONObject coordinates = restaurant.getJSONObject("coordinates");
			if (!coordinates.isNull("latitude")) {
				latitude = coordinates.getDouble("latitude");
			}
			if (!coordinates.isNull("longitude")) {
				longitude = coordinates.getDouble("longitude");
			}
		}
		return Arrays.asList(latitude, longitude);
	}
	
	private Set<String> getCategories (JSONObject restaurant) throws JSONException{
		Set<String> categories = new HashSet<>();
		
		if (!restaurant.isNull("categories")) {
			JSONArray array = restaurant.getJSONArray("categories");
			for (int i = 0; i < array.length(); i++) {
				JSONObject category = array.getJSONObject(i);
				if (!category.isNull("alias")) {
					categories.add(category.getString("alias"));
				}
			}
		}
		return categories;
	}
	
	private void queryAPI(double lat, double lon) {
		List<Item> items = search(lat, lon, null);
		try {
		    for (Item i: items) {
		        JSONObject object = i.toJSONObject();
		        System.out.println(object);
		    }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	public static void main(String[] args) {
		YelpAPI tmApi = new YelpAPI();
		tmApi.queryAPI(37.38, -122.08);
	}


}
