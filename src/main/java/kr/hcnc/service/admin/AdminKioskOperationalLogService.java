package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;

import kr.hcnc.vo.KioskOperationalLogVO;

@Service("adminKioskOperationalLogService")
public class AdminKioskOperationalLogService extends EgovAbstractServiceImpl{
    @Resource(name="apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminKioskOperationalLogService.class);

    public List<KioskOperationalLogVO> selectOpLog(String studentId, String dorm, String createdAt) {
        log.info("Called::selectOpLog");
        String url = "/api/admin/kiosk-op-log?";
        if(studentId != null) url += "studentId=" + studentId + "&";
        if(dorm != null) url += "dorm=" + dorm + "&";
        if(createdAt != null) url += "createdAt=" + createdAt + "&";
        return apiClient.get(url,
                         new ParameterizedTypeReference<List<KioskOperationalLogVO>>(){}
        );
    }

    public int insertOpLog(KioskOperationalLogVO kioskOpVO){
        log.info("Called::inseretLog");
        return apiClient.post("/api/admin/kiosk-op-log/op-log", kioskOpVO,
                                int.class);
    }

    public int insertDormOutLog(KioskOperationalLogVO kioskOpVO){
        log.info("Called :: insertDormOutLog");
        return apiClient.post("/api/admin/kiosk-op-log/dorm-op", kioskOpVO, 
                                int.class);
    }

    public int deleteOpLog(KioskOperationalLogVO kioskOpVO) {
        log.info("Called :: deleteOpLog");
        return apiClient.delete("/api/admin/kiosk-op-log", kioskOpVO,
        		Integer.class
        );
    }
}
