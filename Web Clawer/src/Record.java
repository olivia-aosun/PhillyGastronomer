
public class Record {
	String name;
	
	String address;
	int foodQuality;
	int serviceQuality;
	
	public Record(String name) {
		this.name = name;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setFoodQuality(int foodQuality) {
		this.foodQuality = foodQuality;
	}

	public void setServiceQuality(int serviceQuality) {
		this.serviceQuality = serviceQuality;
	}

	@Override
	public String toString() {
		return name + "," + address + "," + foodQuality + ","
				+ serviceQuality;
	}
	
	
}
