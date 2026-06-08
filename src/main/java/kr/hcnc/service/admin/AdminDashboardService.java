package kr.hcnc.service.admin;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.web.admin.AdminDashboardController;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service("adminDashboardService")
public class AdminDashboardService extends EgovAbstractServiceImpl{
    
     private static final Logger log = LoggerFactory.getLogger(AdminDashboardController.class);
    @Resource(name="apiClient")
     private ApiClient apiClient;
    
    public List<Map<String, Object>> getLogTop10(){
        log.info("Called::getLogTop10()");
        return apiClient.get("/api/admin/dashboard/kiosk-log", List.class);
    }

    public List<Map<String, Object>> getPrintCountByHour(){
        log.info("Called::getPrintCountByHour()");
        return apiClient.get("/api/admin/dashboard/print-count", List.class);
    }

    public List<Map<String, Object>> getPopularFeature() {
        log.info("Called::getPopularFeature()");
        return apiClient.get("/api/admin/dashboard/popular", List.class);
    }

    public Map<String, Object> getAttendCount() {
        log.info("Called::getAttendCount()");
        return apiClient.get("/api/admin/dashboard/attend-count", Map.class);
    }

    public Map<String, Object> getDormStats() {
        log.info("Called::getDormStats()");
        return apiClient.get("/api/admin/dashboard/dorm-stats", Map.class);
    }
}
