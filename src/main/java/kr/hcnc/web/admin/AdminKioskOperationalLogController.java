package kr.hcnc.web.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminKioskOperationalLogService;
import kr.hcnc.vo.KioskOperationalLogVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/admin/kiosk-op-log")
public class AdminKioskOperationalLogController {
    private static final Logger log = LoggerFactory.getLogger(AdminKioskOperationalLogController.class);

    @Resource(name = "adminKioskOperationalLogService")
    private AdminKioskOperationalLogService adminKioskOperationalLogService;

    @GetMapping
	public ResponseEntity<?> getOpLog(@RequestParam(required = false) String studentId,
                                                                @RequestParam(required = false) String dorm,
                                                                @RequestParam(required = false) String createdAt){
		log.info("Called :: getOpLog");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskOperationalLogService.selectOpLog(studentId, dorm, createdAt));
		return ResponseEntity.ok(result);
	}


    @PostMapping("/op-log")
    public ResponseEntity<?> insertOpLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertOpLog()");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskOperationalLogService.insertOpLog(kioskOpVO));
		return ResponseEntity.ok(result);
	}

    @PostMapping("/dorm-op")
	public ResponseEntity<?> insertDormOutLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertDormOutLog");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskOperationalLogService.insertDormOutLog(kioskOpVO));
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteOpLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertDormOutLog");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskOperationalLogService.deleteOpLog(kioskOpVO));
		return ResponseEntity.ok(result);
	}
}
