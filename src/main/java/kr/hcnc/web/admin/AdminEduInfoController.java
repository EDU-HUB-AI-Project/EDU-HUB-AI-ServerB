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

import kr.hcnc.service.admin.AdminEduInfoService;
import kr.hcnc.vo.EduInfoVO;

@RestController
@RequestMapping("/admin/eduInfo")
public class AdminEduInfoController {

	@Resource(name = "adminEduInfoService")
	private AdminEduInfoService adminEduInfoService;
	
	private static final Logger log = LoggerFactory.getLogger(AdminEduInfoController.class);
	
	@GetMapping
	public ResponseEntity<?> getEduInfo() {
		log.info("Called :: GET /admin/eduInfo");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminEduInfoService.selectEduInfo());
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/{eduInfoId}")
	public ResponseEntity<?> getEduInfoById(@PathVariable String eduInfoId) {
		log.info("Called :: GET /admin/eduInfo/{}", eduInfoId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminEduInfoService.selectEduInfoById(eduInfoId));
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<?> insertEduInfo(@RequestBody EduInfoVO eduInfoVO) {
		log.info("Called :: POST /admin/eduInfo");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminEduInfoService.insertEduInfo(eduInfoVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);  
	}
	
	@PutMapping("/{eduInfoId}")
	public ResponseEntity<?> updateEduInfo(@PathVariable String eduInfoId, @RequestBody EduInfoVO eduInfoVO) {
		log.info("Called :: PUT /admin/eduInfo/{}", eduInfoId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminEduInfoService.updateEduInfo(eduInfoId, eduInfoVO));
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/{eduInfoId}")
	public ResponseEntity<?> deleteEduInfo(@PathVariable String eduInfoId) {
		log.info("Called :: DELETE /admin/eduInfo/{}", eduInfoId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminEduInfoService.deleteEduInfo(eduInfoId));
		return ResponseEntity.ok(result);
	}
}
