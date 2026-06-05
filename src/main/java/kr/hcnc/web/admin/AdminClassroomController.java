package kr.hcnc.web.admin;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminClassroomService;
import kr.hcnc.vo.ClassroomVO;

@RestController
@RequestMapping("/admin/classroom")
public class AdminClassroomController {

	@Resource(name = "adminClassroomService")
	private AdminClassroomService adminClassroomService;
	
	private static final Logger log = LoggerFactory.getLogger(AdminClassroomController.class);
	
	@GetMapping
	public ResponseEntity<?> getClassroom() {
		log.info("Called :: GET /admin/classroom");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminClassroomService.selectClassroom());
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/{classroomId}")
	public ResponseEntity<?> getClassroomById(@PathVariable String classroomId) {
		log.info("Called :: GET /admin/classroom/{}", classroomId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminClassroomService.selectClassroomById(classroomId));
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<?> insertClassroom(@RequestBody ClassroomVO classroomVO) {
		log.info("Called :: POST /admin/classroom");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminClassroomService.insertClassroom(classroomVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@PutMapping("/{classroomId}")
	public ResponseEntity<?> updateClassroom(@PathVariable String classroomId, @RequestBody ClassroomVO classroomVO) {
		log.info("Called :: PUT /admin/classroom/{}", classroomId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminClassroomService.updateClassroom(classroomId, classroomVO));
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/{classroomId}")
	public ResponseEntity<?> deleteClassroom(@PathVariable String classroomId) {
		log.info("Called :: DELETE /admin/classroom/{}", classroomId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminClassroomService.deleteClassroom(classroomId));
		return ResponseEntity.ok(result);
	}
}
