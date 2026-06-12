package kr.hcnc.web.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.hcnc.service.admin.AdminKioskLogService;
import kr.hcnc.vo.KioskLogVO;

@RestController
@RequestMapping("/admin/kiosk-log")
public class AdminKioskLogController {
    private static final Logger log = LoggerFactory.getLogger(AdminKioskLogController.class);

    @Resource(name = "adminKioskLogService")
    private AdminKioskLogService adminKioskLogService;
    
    @GetMapping
    public ResponseEntity<?> getKiostLog(@RequestParam(required = false) String logId,
                                                        @RequestParam(required = false) String action,
                                                        @RequestParam(required = false) String createdAt) {
    	log.info("Called::getKiostLog");
    	Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
    	result.put("data", adminKioskLogService.getKiostLog(logId, action, createdAt));
    	return ResponseEntity.ok(result);
    }
 

    @PostMapping
	public ResponseEntity<?> insertLog(@RequestBody KioskLogVO kioskLogVO) {
		log.info("Called::insertLog()");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskLogService.insertLog(kioskLogVO));
		return ResponseEntity.ok(result);
	}

    @DeleteMapping
	public ResponseEntity<?> deleteLog(@RequestBody KioskLogVO kioskLogVO){
		log.info("Called::deleteLog");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminKioskLogService.deleteLog(kioskLogVO));
		return ResponseEntity.ok(result);
	}
}
