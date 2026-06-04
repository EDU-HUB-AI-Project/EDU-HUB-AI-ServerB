package kr.hcnc.vo;

import java.math.BigDecimal;

public class FacilityInfoVO {
	private String facilityId;
	private String facilityType;
	private String name;
	private String location;
	private String imagePath;
	private String description;
	private Integer floor;
	private BigDecimal mapX;
	private BigDecimal mapY;
	private String createdAt;
	private String updatedAt;
	private String delYn;

	public String getFacilityId() { return facilityId; }
	public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

	public String getFacilityType() { return facilityType; }
	public void setFacilityType(String facilityType) { this.facilityType = facilityType; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getLocation() { return location; }
	public void setLocation(String location) { this.location = location; }

	public String getImagePath() { return imagePath; }
	public void setImagePath(String imagePath) { this.imagePath = imagePath; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public Integer getFloor() { return floor; }
	public void setFloor(Integer floor) { this.floor = floor; }

	public BigDecimal getMapX() { return mapX; }
	public void setMapX(BigDecimal mapX) { this.mapX = mapX; }

	public BigDecimal getMapY() { return mapY; }
	public void setMapY(BigDecimal mapY) { this.mapY = mapY; }

	public String getCreatedAt() { return createdAt; }
	public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

	public String getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

	public String getDelYn() { return delYn; }
	public void setDelYn(String delYn) { this.delYn = delYn; }
}
