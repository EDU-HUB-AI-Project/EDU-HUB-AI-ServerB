package kr.hcnc.vo;

public class KioskOperationalLogVO {
    private String opLogId;
	private String studentId;
	private String printing;
	private String dorm;
	private String createdAt;
	private String delYN;
	
	
	public String getOpLogId() {
		return opLogId;
	}
	public void setOpLogId(String opLogId) {
		this.opLogId = opLogId;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	
	public String getPrinting() {
		return printing;
	}
	public void setPrinting(String printing) {
		this.printing = printing;
	}
	public String getDorm() {
		return dorm;
	}
	public void setDorm(String dorm) {
		this.dorm = dorm;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getDelYN() {
		return delYN;
	}
	public void setDelYN(String delYN) {
		this.delYN = delYN;
	}
}
