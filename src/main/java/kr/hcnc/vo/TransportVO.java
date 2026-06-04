package kr.hcnc.vo;

public class TransportVO {
	private String transportId;
	private String type;
	private String content;
	private String createdAt;
	private String updatedAt;
	private String delYn;

	public String getTransportId() { return transportId; }
	public void setTransportId(String transportId) { this.transportId = transportId; }

	public String getType() { return type; }
	public void setType(String type) { this.type = type; }

	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }

	public String getCreatedAt() { return createdAt; }
	public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

	public String getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

	public String getDelYn() { return delYn; }
	public void setDelYn(String delYn) { this.delYn = delYn; }
}
