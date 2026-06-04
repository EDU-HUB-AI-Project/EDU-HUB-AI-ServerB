package kr.hcnc.web.admin;

import java.util.List;

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
	public ResponseEntity<List<FacilityInfoVO>> getFacilityList() {
		log.info("Called :: GET /admin/facilityInfo");
		return ResponseEntity.ok(adminFacilityInfoService.selectFacilityList());
	}

	@GetMapping("/{facilityId}")
	public ResponseEntity<FacilityInfoVO> getFacilityInfo(@PathVariable String facilityId) {
		log.info("Called :: GET /admin/facilityInfo/{}", facilityId);
		return ResponseEntity.ok(adminFacilityInfoService.selectFacilityById(facilityId));
	}

	@PostMapping
	public ResponseEntity<Integer> insertFacility(@RequestBody FacilityInfoVO facilityInfoVO) {
		log.info("Called :: POST /admin/facilityInfo");
		int result = adminFacilityInfoService.insertFacility(facilityInfoVO);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@PutMapping("/{facilityId}")
	public ResponseEntity<Integer> updateFacility(@PathVariable String facilityId,
			@RequestBody FacilityInfoVO facilityInfoVO) {
		log.info("Called :: PUT /admin/facilityInfo/{}", facilityId);
		return ResponseEntity.ok(adminFacilityInfoService.updateFacility(facilityId, facilityInfoVO));
	}

	@DeleteMapping("/{facilityId}")
	public ResponseEntity<Integer> deleteFacility(@PathVariable String facilityId) {
		log.info("Called :: DELETE /admin/facilityInfo/{}", facilityId);
		return ResponseEntity.ok(adminFacilityInfoService.deleteFacility(facilityId));
	}
}
