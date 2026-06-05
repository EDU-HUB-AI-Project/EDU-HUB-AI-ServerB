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

import kr.hcnc.service.admin.AdminFacilityInfoService;
import kr.hcnc.vo.FacilityInfoVO;

@RestController
@RequestMapping("/admin/facilityInfo")
public class AdminFacilityInfoController {

	private static final Logger log = LoggerFactory.getLogger(AdminFacilityInfoController.class);

	@Resource(name = "adminFacilityInfoService")
	private AdminFacilityInfoService adminFacilityInfoService;

	@GetMapping
	public ResponseEntity<?> getFacilityList() {
		log.info("Called :: GET /admin/facilityInfo");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.selectFacilityList());
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{facilityId}")
	public ResponseEntity<?> getFacilityInfo(@PathVariable String facilityId) {
		log.info("Called :: GET /admin/facilityInfo/{}", facilityId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.selectFacilityById(facilityId));
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<?> insertFacility(@RequestBody FacilityInfoVO facilityInfoVO) {
		log.info("Called :: POST /admin/facilityInfo");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.insertFacility(facilityInfoVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@PutMapping("/{facilityId}")
	public ResponseEntity<?> updateFacility(@PathVariable String facilityId,
			@RequestBody FacilityInfoVO facilityInfoVO) {
		log.info("Called :: PUT /admin/facilityInfo/{}", facilityId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.updateFacility(facilityId, facilityInfoVO));
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{facilityId}")
	public ResponseEntity<?> deleteFacility(@PathVariable String facilityId) {
		log.info("Called :: DELETE /admin/facilityInfo/{}", facilityId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.deleteFacility(facilityId));
		return ResponseEntity.ok(result);
	}
}
