package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.DormitoryVO;

@Service("adminDormitoryService")
public class AdminDormitoryService extends EgovAbstractServiceImpl{
    @Resource(name="apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminDormitoryService.class);

    public List<DormitoryVO> gettDormRoomAssignStatus() {
        log.info("Called::gettDormRoomAssignStatus");
        return apiClient.get("/api/admin/dormitories", 
            new ParameterizedTypeReference<List<DormitoryVO>>(){}
        );
    }

    public DormitoryVO getDormRoomAssignStatusById(String dormitoryId) {
        log.info("Called::getDormRoomAssignStatusById");
        return apiClient.get("/api/admin/dormitories/" + dormitoryId, 
                    DormitoryVO.class);
    }

    public int updateDormAssignMaxCnt(DormitoryVO dormitoryVO) {
        log.info("Called::updateDormAssignMaxCnt");
        return apiClient.patch("/api/admin/dormitories/max-count", dormitoryVO,
                                int.class
        );
    }

    public int updateDormCurrentCnt(DormitoryVO dormitoryVO, String studentId) {
        log.info("Called::updateDormCurrentCnt");
        return apiClient.patch("/api/admin/dormitories/current-count?studentId=" + studentId, dormitoryVO,
                                int.class
        );
    }

    public int updateDormCurrentCntDown(DormitoryVO dormitoryVO, String studentId) {
        log.info("Called::updateDormCurrentCntDown");
        return apiClient.patch("/api/admin/dormitories/current-down?studentId=" + studentId, dormitoryVO,
                                int.class
        );
    }
}
