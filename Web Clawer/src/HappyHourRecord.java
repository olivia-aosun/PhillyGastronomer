
public class HappyHourRecord {

	String name;
	String address;
	String hour;
	String deal;
	
	public HappyHourRecord(String name, String address, String hour, String deal) {
		this.name = name;
		this.address = address;
		this.hour = hour;
		this.deal = deal;
	}

	@Override
	public String toString() {
		return name + "," + address + "," + hour + "," + deal;
	}
	
	
}
