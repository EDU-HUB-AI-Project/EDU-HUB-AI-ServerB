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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.hcnc.service.admin.AdminFacilityInfoService;
import kr.hcnc.service.admin.FacilityImageService;
import kr.hcnc.vo.FacilityImageUploadVO;
import kr.hcnc.vo.FacilityInfoVO;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/admin/facilityInfo")
public class AdminFacilityInfoController {

	private static final Logger log = LoggerFactory.getLogger(AdminFacilityInfoController.class);

	@Resource(name = "adminFacilityInfoService")
	private AdminFacilityInfoService adminFacilityInfoService;

	@Resource(name = "facilityImageService")
	private FacilityImageService facilityImageService;

	// 이미지 업로드
	@PostMapping("/upload")
	public ResponseEntity<?> uploadFacilityImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		log.info("Called :: POST /admin/facilityInfo/upload");
		Map<String, Object> result = new HashMap<>();
		try {
			String imagePath = facilityImageService.saveFacilityImage(file, request.getServletContext());
			FacilityImageUploadVO data = new FacilityImageUploadVO();
			data.setImagePath(imagePath);
			result.put("status", 200);
			result.put("data", data);
			return ResponseEntity.ok(result);
		} catch (IllegalArgumentException ex) {
			result.put("status", 400);
			result.put("message", ex.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
		} catch (Exception ex) {
			log.error("Facility image upload failed", ex);
			result.put("status", 500);
			result.put("message", "이미지 업로드에 실패했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
	}

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
			@RequestBody FacilityInfoVO facilityInfoVO, HttpServletRequest request) {
		log.info("Called :: PUT /admin/facilityInfo/{}", facilityId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.updateFacility(facilityId, facilityInfoVO,
				request.getServletContext()));
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{facilityId}")
	public ResponseEntity<?> deleteFacility(@PathVariable String facilityId, HttpServletRequest request) {
		log.info("Called :: DELETE /admin/facilityInfo/{}", facilityId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminFacilityInfoService.deleteFacility(facilityId, request.getServletContext()));
		return ResponseEntity.ok(result);
	}
}
