package external;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class HappyHourReader {
	private Map<String, List<String>> map;
	
	public HappyHourReader(InputStream file) throws FileNotFoundException{
		map = new HashMap<>();
		readFile(file);
	}
	
	private void readFile(InputStream happyhour) throws FileNotFoundException {
		Scanner sc = new Scanner(happyhour, "UTF-8");
		while (sc.hasNext()) {
            String line = sc.nextLine();
            saveToMap(line);
        }
        sc.close();
	}
	
	private void saveToMap(String line) {
		String[] entries = line.split(",");
		//System.out.println(Arrays.toString(entries));
		String streetAddr = null;
		String time = null;
		String details = null;
		StringBuilder sb = new StringBuilder();
		if (!entries[1].trim().equals("The")) {
			streetAddr = entries[1];
			time = entries[2];
			for (int i = 3; i < entries.length; i++) {
				sb.append(entries[i]).append(",");
			}
			details = sb.toString().substring(0, sb.length()-2);
		} else {
			streetAddr = entries[2];
			time = entries[3];
			for (int i = 4; i < entries.length; i++) {
				sb.append(entries[i]).append(",");
			}
			details = sb.toString().substring(0, sb.length()-2);
		}
		streetAddr = streetAddr.replace("(", "");
		streetAddr = streetAddr.replace(")", "");
		streetAddr = streetAddr.replace(".", "");
		streetAddr = streetAddr.replace("Street", "St");
		streetAddr = streetAddr.replace("Avenue", "Ave");
		streetAddr = streetAddr.replace("Boulevard", "Blvd");
		streetAddr = streetAddr.replace("Place", "Pl");
		streetAddr = streetAddr.replace("South", "S");
		streetAddr = streetAddr.replace("North", "N");
		streetAddr = streetAddr.replace("East", "E");
		streetAddr = streetAddr.replace("West", "W");
		System.out.println(streetAddr);
		map.put(streetAddr, Arrays.asList(time, details));
	}
	
	public Map<String, List<String>> getMap() {
		return map;
	}

	public List<String> getTimeAndDetails(String streetAddr) {
		return map.getOrDefault(streetAddr, new ArrayList<>());
	}
	
	
//	public static void main(String[] args) throws FileNotFoundException {
//		HappyHourReader hhr = new HappyHourReader("HappyHour.csv");
//		Map<String, List<String>> map = hhr.getMap();
//		System.out.println(map.size());
//	}
}
