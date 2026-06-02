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

import java.util.List;

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
	public ResponseEntity<List<KioskOperationalLogVO>> getOpLog(@RequestParam(required = false) String studentId,
                                                                @RequestParam(required = false) String dorm,
                                                                @RequestParam(required = false) String createdAt){
		log.info("Called :: getOpLog");
		return ResponseEntity.ok(adminKioskOperationalLogService.selectOpLog(studentId, dorm, createdAt));
	}


    @PostMapping("/op-log")
    public ResponseEntity<Integer> insertOpLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertOpLog()");
		int result = adminKioskOperationalLogService.insertOpLog(kioskOpVO);
		return ResponseEntity.ok(result);
	}

    @PostMapping("/dorm-op")
	public ResponseEntity<Integer> insertDormOutLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertDormOutLog");
		int result = adminKioskOperationalLogService.insertDormOutLog(kioskOpVO);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping
	public ResponseEntity<Integer> deleteOpLog(@RequestBody KioskOperationalLogVO kioskOpVO) {
		log.info("Called :: insertDormOutLog");
		int result = adminKioskOperationalLogService.deleteOpLog(kioskOpVO);
		return ResponseEntity.ok(result);
	}
}
