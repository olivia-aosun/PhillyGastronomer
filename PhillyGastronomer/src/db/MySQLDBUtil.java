package db;

public class MySQLDBUtil {
	private static final String HOSTNAME = "localhost";
	private static final String PORT_NUM = "3306";// localhost 3306 for running on aws, 8889 for mamp, you should also change to any other port if needed
	public static final String DB_NAME = "550project";
	private static final String USERNAME = "root";
	private static final String PASSWORD = "root";
	public static final String URL = "jdbc:mysql://" + HOSTNAME + ":" + PORT_NUM + "/" + DB_NAME + "?user=" + USERNAME
			+ "&password=" + PASSWORD + "&autoreconnect=true&serverTimezone=UTC";

}
