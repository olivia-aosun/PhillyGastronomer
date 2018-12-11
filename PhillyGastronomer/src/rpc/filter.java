package rpc;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import db.MySQLConnection;
import entity.Item;

/**
 * Servlet implementation class searchItem
 */
@WebServlet("/filter")
public class filter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public filter() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request,
    		HttpServletResponse response) throws ServletException, IOException {
    	
    	// allow access only if session exists
    	
    	
		MySQLConnection connection = new MySQLConnection();
		
		Map<String, String> map = new HashMap<>();
		Set<String> set = new HashSet<>();
		Map<String, String> convert = new HashMap<>();
		convert.put("$$$$", "4");
		convert.put("$$$", "3");
		convert.put("$$", "2");
		convert.put("$", "1");
		if(request.getParameter("rating") != null){
			map.put("rating", request.getParameter("rating"));
			System.out.println("rating");
		}
		
		if(request.getParameter("category") != null){
			map.put("category", request.getParameter("category"));
			set.add("category");
		}
		
		if(request.getParameter("price_range") != null){
			
			map.put("price_range", convert.get(request.getParameter("price_range")));
			
		}
		
		if(request.getParameter("food_quality") != null){
			map.put("food_quality", request.getParameter("food_quality"));
			set.add("foodquality");
		}
		
		if(request.getParameter("service_quality") != null){
			map.put("service_quality", request.getParameter("service_quality"));
			set.add("foodquality");
		}
		
		
		
		if(request.getParameter("walk_score") != null){
			map.put("walk_score", request.getParameter("walk_score"));
			set.add("walkscore");
		}
		
		if(request.getParameter("bike_score") != null){
			map.put("bike_score", request.getParameter("bike_score"));
			set.add("walkscore");
		}
		
		if(request.getParameter("transit_score") != null){
			map.put("transit_score", request.getParameter("transit_score"));
			set.add("walkscore");
		}
		
		if(request.getParameter("happy_hour") != null){
			map.put("happy_hour", request.getParameter("happy_hour"));
			set.add("happyhour");
		}
		
		
		//localhost:8080/PhillyGastronomer/filter?priceRange=value1&walkScore=value1
		try {
			JSONArray array = connection.filter(map, set);
			RpcHelper.writeJsonArray(response, array);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			connection.close();
		}


    }
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
