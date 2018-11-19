import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class HappyHour {

	private static final String USER_AGENT =
			"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1";

	public static void main(String[] args) {

		List<String> urls = new ArrayList<String>();
		List<HappyHourRecord> records = new ArrayList<>();

		urls.add("https://philly.thedrinknation.com/specials/Sunday");
		urls.add("https://philly.thedrinknation.com/specials/Monday");
		urls.add("https://philly.thedrinknation.com/specials/Tuesday");
		urls.add("https://philly.thedrinknation.com/specials/Wednesday");
		urls.add("https://philly.thedrinknation.com/specials/Thursday");
		urls.add("https://philly.thedrinknation.com/specials/Friday");
		urls.add("https://philly.thedrinknation.com/specials/Saturday");

		for (String url: urls) {
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
				String bodyText = htmlDocument.body().html();

				Pattern num = Pattern.compile("When you're looking for a place to indulge in happy hour Philadelphia has plenty to choose from.");
				Matcher numMatcher = num.matcher(bodyText);

				// group 1: id-name; 
				// group 2: name; 
				// group 3: neighborhood; 
				// group 4: address; 
				// group 5: phone#
				// group 6: id
				// group 7: website1
				// group 8: website2
				// group 9: type
				// group 10: happy hour
				// group 11: deal
				String pattern = "<a href=\"https://philly.thedrinknation.com/bars/profile/(.+?)\"> (.+?) </a> <span class=\"barNHood\"> (.+?) </span></h2> "
						+ "(.+?) [\\n][ ]{8}<br> [\\n][ ]{8}<!--(.+?)      <br/>--> [\\n][ ]{8}<a class=\"barLink\" id=\"(\\d+)\" href=\"(.+?)\" target=\"_blank\"> "
						+ "(.+?) </a> [\\n][ ]{8}<div class=\"todaysSpecial\"> [\\n][ ]{9}<div style=\"font-size:12px;\">[\\n][ ]{10}<strong> (.+?) </strong>"
						+ "[\\n][ ]{10}<span style=\"font-size:11px;font-style:italic\"> (.+?)</span>: (.+?) [\\n][ ]{9}</div>";
				Pattern restName = Pattern.compile(pattern);
				Matcher matcher = restName.matcher(bodyText);
//				int count = 1;
				while (matcher.find()) {
//					System.out.println(count);
//					count++;
					String name = matcher.group(2);
//					System.out.println(name);
					String address = matcher.group(4);
					int index1 = address.indexOf('(');
					if (index1 > 0) {
						address = address.substring(0, index1 - 1);
					}
					int index2 = address.indexOf(';');
					if (index2 > 0) {
						address = address.substring(0, index2);
					}
//					System.out.println(address);
					String hour = matcher.group(10);
					hour = hour.substring(2, hour.length() - 2);
//					System.out.println(hour);
					String deal = matcher.group(11);
//					System.out.println(deal);
					HappyHourRecord r = new HappyHourRecord(name, address, hour, deal);
					records.add(r);
				}
				//				}
			} catch(IOException ioe) {
				// We were not successful in our HTTP request
				ioe.printStackTrace();
			}
		}
				
				try {
					PrintWriter out = new PrintWriter("HappyHour.csv");
					for (HappyHourRecord r: records) {
						out.println(r.toString());
					}
					out.close();
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	}
}
