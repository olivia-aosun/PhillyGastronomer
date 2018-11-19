package external;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class HappyHourReader {
	private Map<String, List<String>> map;
	
	public HappyHourReader(String fileName) throws FileNotFoundException{
		map = new HashMap<>();
		readFile(new File(fileName));
	}
	
	private void readFile(File happyhour) throws FileNotFoundException {
		Scanner sc = new Scanner(happyhour);
		while (sc.hasNext()) {
            String line = sc.nextLine();
            saveToMap(line);
        }
        sc.close();
	}
	
	private void saveToMap(String line) {
		String[] entries = line.split(",");
		String streetAddr = null;
		String time = null;
		String details = null;
		StringBuilder sb = new StringBuilder();
		if (!entries[1].equals("The")) {
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
		map.put(streetAddr, Arrays.asList(time, details));
	}

	public List<String> getTimeAndDetails(String streetAddr) {
		return map.getOrDefault(streetAddr, new ArrayList<>());
	}
	
	
	public static void main(String[] args) {
		HappyHourReader
	}
}
