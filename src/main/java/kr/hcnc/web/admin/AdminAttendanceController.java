package kr.hcnc.web.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<?> getAttendance(@RequestParam(required=false) String studentId,
														@RequestParam(required=false) String eduId,
														@RequestParam(required=false) String attendDate,
														@RequestParam(required=false) String status){
		log.info("Called::getAttendance()");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminAttendanceService.getAttend(studentId, eduId, attendDate, status));
		return ResponseEntity.ok(result);

	}
	
	// message, status, attendDate
	@PatchMapping("/{studentId}")
	public ResponseEntity<?> updateAttendMsg(@PathVariable String studentId,
													@RequestBody AttendVO attendVO) {
		log.info("studId::{}", studentId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminAttendanceService.updateAttendMsg(studentId, attendVO));
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<?> insertAttend(@RequestBody AttendVO attendVO) {
		log.info("Called :: POST /admin/attendance");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminAttendanceService.insertAttend(attendVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@PostMapping("/list")
	public ResponseEntity<?> insertAttend(@RequestBody List<AttendVO> attendList){
		log.info("Called :: POST /admin/attendance");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminAttendanceService.insertAttend(attendList));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@DeleteMapping("/{attendId}")
	public ResponseEntity<?> deleteAttend(@PathVariable String attendId) {
		log.info("Called :: DELETE /admin/attendance");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
	    result.put("data", null);
		adminAttendanceService.deleteAttend(attendId);
		return ResponseEntity.ok(result);
	}
}
