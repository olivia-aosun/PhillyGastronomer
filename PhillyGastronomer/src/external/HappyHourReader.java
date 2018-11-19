package external;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class HappyHourReader {
	private List<String> lines;
	
	HappyHourReader(String fileName) throws FileNotFoundException{
		readFile(new File(fileName));
	}
	
	private void readFile(File happyhour) throws FileNotFoundException {
		lines = new ArrayList<>();	
		Scanner sc = new Scanner(happyhour);
		while (sc.hasNext()) {
            String line = sc.nextLine();
            lines.add(line);
        }
        sc.close();
	}

	public List<String> getList() {
		return lines;
	}
	
	public List<String> getDetails(String address, String line) {
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
		
		String itemStreet = address.split(",")[0];
		itemStreet = itemStreet.replace("\"", "");
		
		if (streetAddr.equals(itemStreet)) {
			return Arrays.asList(time, details);
		}
		return new ArrayList<>();
	}
}
