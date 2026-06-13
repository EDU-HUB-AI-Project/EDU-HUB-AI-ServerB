package kr.hcnc.vo;

public class AttendVO {
	private String AttendanceId;
	private String studentId;
	private String studentName;
	private String phone;
	private String eduId;
	private String eduName;
	private String eduStartDate;
	private String eduEndDate;
	private String status;
	private String message;
	private String createdAt;
	private String updatedAt;
	private String attendDate;
	
	public String getAttendanceId() {
		return AttendanceId;
	}
	public void setAttendanceId(String attendanceId) {
		AttendanceId = attendanceId;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getEduId() {
		return eduId;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setEduId(String eduId) {
		this.eduId = eduId;
	}
	public String getEduName() {
		return eduName;
	}
	public void setEduName(String eduName) {
		this.eduName = eduName;
	}
	public String getEduStartDate() {
		return eduStartDate;
	}
	public void setEduStartDate(String eduStartDate) {
		this.eduStartDate = eduStartDate;
	}
	public String getEduEndDate() {
		return eduEndDate;
	}
	public void setEduEndDate(String eduEndDate) {
		this.eduEndDate = eduEndDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
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
	public String getAttendDate() {
		return attendDate;
	}
	public void setAttendDate(String attendDate) {
		this.attendDate = attendDate;
	}
}
