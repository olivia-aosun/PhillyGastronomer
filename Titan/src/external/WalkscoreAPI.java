package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;


public class WalkscoreAPI {
	private static final String HOST = "http://api.walkscore.com";
	private static final String ENDPOINT = "/score";
	private static final String RETURN_TYPE = "json";

	private static final String SHOW_TRANSIT = "1";
	private static final String SHOW_BIKE = "1";
	private static final String API_KEY = "5aaa1829728791d6d940820a5e43353f";
	
	public JSONObject search(double lat, double lon, String address) {
		
		address = convert(address);
 		
 		String query = String.format("format=%s&address=%s&lat=%.4f&lon=%.4f&transit=%s&bike=%s&wsapikey=%s", RETURN_TYPE, address, lat, lon, SHOW_TRANSIT, SHOW_BIKE, API_KEY);
 		String url = HOST + ENDPOINT + "?" + query;
 		
 		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to URL: " + url);
			
			if (responseCode != 200) {
				return new JSONObject();
			}
					
			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String inputLine = "";
			StringBuilder response = new StringBuilder();
			
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
			
			JSONObject obj = new JSONObject(response.toString());
			// System.out.println(obj.toString());
			if (obj.getInt("status") == 1) {
				return obj;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
 			
		return new JSONObject();
	}
	
	private String convert(String address) {
		address = address.replace("\"", "");
		address = address.replace(",", "");
		address = address.replace(" ", "%20");
		return address;
	}
	
//	public static void main(String[] args) {
//		String s = "\"1815 John F Kennedy Blvd\",\"Fl 1\",\"Philadelphia, PA 19103\"";
//		String n = convert(s);
//		System.out.print(n);
//	}
}
