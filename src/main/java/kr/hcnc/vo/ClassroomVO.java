package kr.hcnc.vo;

public class ClassroomVO {

	private String classroomId;
	private String classroomName;
	private Integer floor;
	private String imageId;
	private String imagePath;
	private String createdAt;
	private String updatedAt;
	
	public String getClassroomId() {
		return classroomId;
	}
	public void setClassroomId(String classroomId) {
		this.classroomId = classroomId;
	}
	public String getClassroomName() {
		return classroomName;
	}
	public void setClassroomName(String classroomName) {
		this.classroomName = classroomName;
	}
	public Integer getFloor() {
		return floor;
	}
	public void setFloor(Integer floor) {
		this.floor = floor;
	}
	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	
}

/*
CLASSROOM_ID	varchar(10)
CLASSROOM_NAME	varchar(100)
IMAGE_ID	varchar(50)
IMAGE_PATH	varchar(500)
CREATED_AT	timestamp
UPDATED_AT	timestamp
DEL_YN	char(1)
*/