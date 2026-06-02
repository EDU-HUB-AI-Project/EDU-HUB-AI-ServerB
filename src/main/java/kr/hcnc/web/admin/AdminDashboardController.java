package kr.hcnc.web.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminDashboardService;

import java.util.List;
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

    @GetMapping("/print-count")
    public ResponseEntity<List<Map<String, Object>>> getPrintCountByHour() {
        log.info("Called::getPrintCountByHour()");
        return ResponseEntity.ok(adminDashboardService.getPrintCountByHour());
    }
    @GetMapping("/popular")
    public ResponseEntity<List<Map<String, Object>>> getPopularFeature() {
        log.info("Called::getPopularFeature()");
        return ResponseEntity.ok(adminDashboardService.getPopularFeature());
    }
    @GetMapping("/attend-count")
    public ResponseEntity<Map<String, Object>> getAttendCount() {
         log.info("Called::getAttendCount()");
         return ResponseEntity.ok(adminDashboardService.getAttendCount());
    }
    @GetMapping("/dorm-stats")
    public ResponseEntity<Map<String, Object>> getDormStats() {
        log.info("Called::getDormStats()");
        return ResponseEntity.ok(adminDashboardService.getDormStats());
    }

}
