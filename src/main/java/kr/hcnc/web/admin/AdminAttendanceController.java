package kr.hcnc.web.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminAttendanceService;
import kr.hcnc.vo.AttendVO;

@RestController
@RequestMapping("/admin/attendance")
public class AdminAttendanceController {
	@Resource(name="adminAttendanceService")
	private AdminAttendanceService adminAttendanceService;

	private static final Logger log = LoggerFactory.getLogger(AdminAttendanceController.class);
	
	@GetMapping 
	public ResponseEntity<List<AttendVO>> getAttendance(@RequestParam(required=false) String studentId,
														@RequestParam(required=false) String eduId,
														@RequestParam(required=false) String attendDate,
														@RequestParam(required=false) String status){
		log.info("Called::getAttendance()");
		return ResponseEntity.ok(adminAttendanceService.getAttend(studentId, eduId, attendDate, status));
	}
	
	// message, status, attendDate
	@PatchMapping("/{studentId}")
	public ResponseEntity<Integer> updateAttendMsg(@PathVariable String studentId,
													@RequestBody AttendVO attendVO) {
		log.info("studId::{}", studentId);
		return ResponseEntity.ok(adminAttendanceService.updateAttendMsg(studentId, attendVO));
	}

	
}
