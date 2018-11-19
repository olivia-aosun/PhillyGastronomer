import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class CleanPlates {

	private static final String USER_AGENT =
			"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1";
	private Map<String, List<Integer>> map;
	
	public CleanPlates() {
		map = new HashMap<>();
	}
	
	public List<Integer> getFoodAndServiceQuality(String restaurant, String addr) {

		int processed = 0;
		int found = 0;
		do {	
			String url = "http://data.inquirer.com/inspections/philly/?searchType=restaurant&rname=" + restaurant;
			if (processed != 0) {
				int end = processed + 50;
				url = url + "&start=" + processed + "&end=" + end;
			}

			try {
				Connection connection = Jsoup.connect(url).userAgent(USER_AGENT);
				Document htmlDocument = connection.get();
				if(connection.response().statusCode() == 200) // 200 is the HTTP OK status code
				{
					System.out.println("\n**Visiting** Received web page at " + url);
				}
				if(!connection.response().contentType().contains("text/html"))
				{
					System.out.println("**Failure** Retrieved something other than HTML");
				}
				String bodyText = htmlDocument.body().text();

				Pattern num = Pattern.compile("Found: (\\d+)");
				Matcher numMatcher = num.matcher(bodyText);

				int index = 0;
				if (numMatcher.find()) {
					found = Integer.parseInt(numMatcher.group(1));
					index = numMatcher.end();
				}
				String body = bodyText.substring(index);
				
				// group 1: index; 
				// group 2: name; 
				// group 3: inspection month; 
				// group 4: inspection day; 
				// group 5: inspection year
				// group 6: street address
				// group 7: zipcode
				// group 8: neighborhood
				// group 9: food quality
				// group 10: service quality

				Pattern restName = Pattern.compile(" (\\d+) (.+?) Inspection date: (.+?) (\\d+), (\\d+) (.+?)[\\s?](\\d*)[\\s?](.*?) Violations (\\d+)Foodborne Illness Risk Factors (\\d+)Lack of Good Retail Practices");
				Matcher matcher = restName.matcher(body);
				while (matcher.find()) {
					processed++;
					String name = matcher.group(2);
					String streetAddr = matcher.group(6);
					String zipcode = matcher.group(7);
					int foodQ = Integer.parseInt(matcher.group(9));
					int serviceQ = Integer.parseInt(matcher.group(10));
					map.put(streetAddr, Arrays.asList(foodQ, serviceQ));
				}
			}
			catch(IOException ioe)
			{
				// We were not successful in our HTTP request
				ioe.printStackTrace();
			}
		} while (processed < found);

		return map.get(addr);
	}

}
