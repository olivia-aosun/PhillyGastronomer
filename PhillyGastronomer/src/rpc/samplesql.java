package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import db.MySQLConnection;

/**
 * Servlet implementation class samplesql
 */
@WebServlet("/samplesql")
public class samplesql extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public samplesql() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		MySQLConnection connection = new MySQLConnection();
		
		String priceRangeStr = request.getParameter("priceRange");
		String walkScoreStr = request.getParameter("walkScore");
		int priceRange = Integer.parseInt(priceRangeStr);
		int walkScore = Integer.parseInt(walkScoreStr);
		
		try {
			JSONArray array = connection.getWalkableRestaurants(priceRange, walkScore);
			RpcHelper.writeJsonArray(response, array);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
