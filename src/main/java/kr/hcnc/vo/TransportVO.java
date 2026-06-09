package kr.hcnc.vo;

public class TransportVO {
	private String transportId;
	private String type;
	private String departLocation;
	private String destination;
	private String departTime;
	private String arriveTime;
	private String createdAt;
	private String updatedAt;
	private String delYn;

	public String getTransportId() { return transportId; }
	public void setTransportId(String transportId) { this.transportId = transportId; }

	public String getType() { return type; }
	public void setType(String type) { this.type = type; }

	public String getDepartLocation() { return departLocation; }
	public void setDepartLocation(String departLocation) { this.departLocation = departLocation; }

	public String getDestination() { return destination; }
	public void setDestination(String destination) { this.destination = destination; }

	public String getDepartTime() { return departTime; }
	public void setDepartTime(String departTime) { this.departTime = departTime; }

	public String getArriveTime() { return arriveTime; }
	public void setArriveTime(String arriveTime) { this.arriveTime = arriveTime; }

	public String getCreatedAt() { return createdAt; }
	public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

	public String getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

	public String getDelYn() { return delYn; }
	public void setDelYn(String delYn) { this.delYn = delYn; }
}
