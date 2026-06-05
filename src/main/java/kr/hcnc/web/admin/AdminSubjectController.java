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

import kr.hcnc.service.admin.AdminSubjectService;
import kr.hcnc.vo.SubjectVO;

@RestController
@RequestMapping("/admin/subject")
public class AdminSubjectController {

	@Resource(name = "adminSubjectService")
	private AdminSubjectService adminSubjectService;
	
	private static final Logger log = LoggerFactory.getLogger(AdminSubjectController.class);
	
	@GetMapping
	public ResponseEntity<?> getSubject() {
		log.info("Called :: GET /admin/subject");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminSubjectService.selectSubject());
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/{subjectId}")
	public ResponseEntity<?> getSubjectById(@PathVariable String subjectId) {
		log.info("Called :: GET /admin/subject/{}", subjectId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminSubjectService.selectSubjectById(subjectId));
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<?> insertSubject(@RequestBody SubjectVO subjectVO) {
		log.info("Called :: POST /admin/subject");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminSubjectService.insertSubject(subjectVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@PutMapping("/{subjectId}")
	public ResponseEntity<?> updateSubject(@PathVariable String subjectId, @RequestBody SubjectVO subjectVO) {
		log.info("Called :: PUT /admin/subject/{}", subjectId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminSubjectService.updateSubject(subjectId, subjectVO));
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/{subjectId}")
	public ResponseEntity<?> deleteSubject(@PathVariable String subjectId) {
		log.info("Called :: DELETE /admin/subject/{}", subjectId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminSubjectService.deleteSubject(subjectId));
		return ResponseEntity.ok(result);
	}
}
