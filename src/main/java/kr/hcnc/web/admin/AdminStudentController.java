package kr.hcnc.web.admin;

import java.util.List;
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

import kr.hcnc.service.admin.AdminStudentService;
import kr.hcnc.vo.StudentVO;

@RestController
@RequestMapping("/admin/student")
public class AdminStudentController {

	@Resource(name = "adminStudentService")
	private AdminStudentService adminStudentService;
	
	private static final Logger log = LoggerFactory.getLogger(AdminStudentController.class);
	
	@GetMapping
	public ResponseEntity<List<StudentVO>> getStudent() {
		log.info("Called :: GET /admin/student");
		return ResponseEntity.ok(adminStudentService.selectStudent());
	}
	
	@GetMapping("/{studentId}")
	public ResponseEntity<StudentVO> getStudentById(@PathVariable String studentId) {
		log.info("Called :: GET /admin/student/{}", studentId);
		return ResponseEntity.ok(adminStudentService.selectStudentById(studentId));
	}
	
	@PostMapping
	public ResponseEntity<?> insertStudent(@RequestBody StudentVO studentVO) {
		log.info("Called :: POST /admin/student");
		Map<String, Object> response = adminStudentService.insertStudent(studentVO);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@PutMapping("/{studentId}")
	public ResponseEntity<?> updateStudent(@PathVariable String studentId, @RequestBody StudentVO studentVO) {
		log.info("Called :: PUT /admin/student");
		Map<String, Object> response = adminStudentService.updateStudent(studentId, studentVO);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{studentId}")
	public ResponseEntity<?> deleteStudent(@PathVariable String studentId) {
		log.info("Called :: DELETE /admin/student/{}", studentId);
		adminStudentService.deleteStudent(studentId);
		return ResponseEntity.ok().build();
	}
}
