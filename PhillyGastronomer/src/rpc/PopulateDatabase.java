package rpc;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import db.MySQLConnection;
import entity.Item;

/**
 * Servlet implementation class PopulateDatabase
 */
@WebServlet("/pop")
public class PopulateDatabase extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PopulateDatabase() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		response.getWriter().append("Served at: ").append(request.getContextPath());
		// Term can be empty or null.
		
		InputStream input = getServletContext().getResourceAsStream("/WEB-INF/HappyHour.csv");
		
		MySQLConnection connection = new MySQLConnection();
		try {
			List<Item> items = connection.populateDatabase(input);

			JSONArray array = new JSONArray();
			for (Item item : items) {
				array.put(item.toJSONObject());
			}
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
