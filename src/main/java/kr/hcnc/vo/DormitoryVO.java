package kr.hcnc.vo;

public class DormitoryVO {
    private String dormitoryId;
	private String eduId;
	private int currentCount;
	private int maxCount;
	private String delYn;
	private String dormitoryRoomName;
	
	public String getDormitoryId() {
		return dormitoryId;
	}
	public void setDormitoryId(String dormitoryId) {
		this.dormitoryId = dormitoryId;
	}
	public String getEduId() {
		return eduId;
	}
	public void setEduId(String eduId) {
		this.eduId = eduId;
	}
	public int getCurrentCount() {
		return currentCount;
	}
	public void setCurrentCount(int currentCount) {
		this.currentCount = currentCount;
	}
	public int getMaxCount() {
		return maxCount;
	}
	public void setMaxCount(int maxCount) {
		this.maxCount = maxCount;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
	public String getDormitoryRoomName() {
		return dormitoryRoomName;
	}
	public void setDormitoryRoomName(String dormitoryRoomName) {
		this.dormitoryRoomName = dormitoryRoomName;
	}
}
