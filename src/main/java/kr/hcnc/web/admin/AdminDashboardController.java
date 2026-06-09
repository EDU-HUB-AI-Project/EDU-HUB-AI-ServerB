package kr.hcnc.web.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminDashboardService;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {
    
    private static final Logger log = LoggerFactory.getLogger(AdminDashboardController.class);
    @Resource(name="adminDashboardService")
    private AdminDashboardService adminDashboardService;
    
    @GetMapping("/kiosk-log")
    public ResponseEntity<?> getLogTop10(){
    	log.info("Called::getLogTop10()");
        Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminDashboardService.getLogTop10());
		return ResponseEntity.ok(result);
    }

    @GetMapping("/print-count")
    public ResponseEntity<?> getPrintCountByHour() {
        log.info("Called::getPrintCountByHour()");
        Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminDashboardService.getPrintCountByHour());
        return ResponseEntity.ok(result);
    }
    @GetMapping("/popular")
    public ResponseEntity<?> getPopularFeature() {
        log.info("Called::getPopularFeature()");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
		result.put("data", adminDashboardService.getPopularFeature());
        return ResponseEntity.ok(result);
    }
    @GetMapping("/attend-count")
    public ResponseEntity<?> getAttendCount() {
         log.info("Called::getAttendCount()");
         Map<String, Object> result = new HashMap<>();
         result.put("status", 200);
 		 result.put("data", adminDashboardService.getAttendCount());
         return ResponseEntity.ok(result);
    }
    @GetMapping("/dorm-stats")
    public ResponseEntity<?> getDormStats() {
        log.info("Called::getDormStats()");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
		result.put("data", adminDashboardService.getDormStats());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/edu-stats")
    public ResponseEntity<?> getEduStats() {
    	log.info("Called :: getEduStats()");
    	Map<String, Object> result = new HashMap<>();
    	result.put("status", 200);
    	result.put("data", adminDashboardService.getEduStats());
    	return ResponseEntity.ok(result);
    }
}
