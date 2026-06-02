package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.KioskLogVO;


@Service("adminKioskLogService")
public class AdminKioskLogService extends EgovAbstractServiceImpl{
    @Resource(name="apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminKioskLogService.class);
    
    public List<KioskLogVO> getKiostLog(String logId, String action, String createdAt) {
    	log.info("Called::getKiostLog");
    	String url = "/api/admin/kiosk-log?";
    	if(logId != null) url += "logId=" + logId + "&";
        if(action != null) url += "action=" + action + "&";
        if(createdAt != null) url += "createdAt=" + createdAt + "&";
        
        return apiClient.get(url, new ParameterizedTypeReference<List<KioskLogVO>>() {});
    }
    
    
    public int insertLog(KioskLogVO kioskLogVO) {
		log.info("Called::insertLog()");
        return apiClient.post("/api/admin/kiosk-log", kioskLogVO,
                    int.class
        );
    }
    
	public int deleteLog(KioskLogVO kioskLogVO){
		log.info("Called::deleteLog");
        return apiClient.delete("/api/admin/kiosk-log", kioskLogVO, int.class);
    }
}
