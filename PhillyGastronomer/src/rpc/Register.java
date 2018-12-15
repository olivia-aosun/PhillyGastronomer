package rpc;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import db.MySQLConnection;

/**
 * Servlet implementation class register
 */
@WebServlet("/register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		MySQLConnection connection = new MySQLConnection();
		try {
			JSONObject input = RpcHelper.readJSONObject(request);
			String userId = input.getString("user_id");
			String pwd = input.getString("password");
			String firstName = input.getString("first_name");
			String lastName = input.getString("last_name");
			//check if user exists
			JSONObject obj = new JSONObject();
			
			if(!connection.checkUser(userId)) {
				response.setStatus(409);
				obj.put("status", "this user id has already been used");
			}else {
				List<String> columns = new ArrayList<>();
				columns.add(userId);
				columns.add(pwd);
				columns.add(firstName);
				columns.add(lastName);
				connection.createUser(columns);
				
				String name = connection.getFullname(userId);
				obj.put("status", "OK");
				obj.put("user_id", userId);
				obj.put("name", name);
				RpcHelper.writeJsonObject(response, obj);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		
	}

}
