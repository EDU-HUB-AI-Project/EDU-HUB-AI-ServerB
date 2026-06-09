package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.DormAssignVO;
import kr.hcnc.vo.DormInOutVO;
import kr.hcnc.vo.DormitoryVO;

@Service("adminDormitoryService")
public class AdminDormitoryService extends EgovAbstractServiceImpl{
    @Resource(name="apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminDormitoryService.class);
    
    public List<DormAssignVO> getDormAssign(){
    	log.info("Called::getDormAssign");
    	return apiClient.get("/api/admin/dormitories", 
    			new ParameterizedTypeReference<List<DormAssignVO>>(){}
    	);
    }
    
    public List<DormitoryVO> getCmbDorm(){
    	log.info("Called::getDormAssign");
    	return apiClient.get("/api/admin/dormitories/combo-box", 
    			new ParameterizedTypeReference<List<DormitoryVO>>(){}
    	);
    }
    
    public List<DormInOutVO> getDormWaiting(){
    	log.info("Called::getDormWaiting");
    	return apiClient.get("/api/admin/dormitories/waiting", 
    			new ParameterizedTypeReference<List<DormInOutVO>>(){}
    	);
    }
    
    public List<DormInOutVO> getDormIn(){
    	log.info("Called::getDormIn");
    	return apiClient.get("/api/admin/dormitories/check-in", 
    			new ParameterizedTypeReference<List<DormInOutVO>>(){}
    	);
    }
    
    public List<DormInOutVO> getDormOut(){
    	log.info("Called::getDormOut");
    	return apiClient.get("/api/admin/dormitories/check-out", 
    			new ParameterizedTypeReference<List<DormInOutVO>>(){}
    	);
    }

    public List<DormitoryVO> getDormRoomAssignStatus() {
        log.info("Called::gettDormRoomAssignStatus");
        return apiClient.get("/api/admin/dormitories/assign-status", 
            new ParameterizedTypeReference<List<DormitoryVO>>(){}
        );
    }

    public DormitoryVO getDormRoomAssignStatusById(String dormitoryId) {
        log.info("Called::getDormRoomAssignStatusById");
        return apiClient.get("/api/admin/dormitories/" + dormitoryId, 
                    DormitoryVO.class);
    }
    
    public int updateDormId (String studentId, DormAssignVO dormAssignVO) {
    	log.info("Called::updateDormId");
    	return apiClient.patch("/api/admin/dormitories/" + studentId, dormAssignVO, 
    						Integer.class
		);
    }

    public int updateDormAssignMaxCnt(DormitoryVO dormitoryVO) {
        log.info("Called::updateDormAssignMaxCnt");
        return apiClient.patch("/api/admin/dormitories/max-count", dormitoryVO,
                                Integer.class
        );
    }

    public int updateDormCurrentCnt(DormitoryVO dormitoryVO, String studentId) {
        log.info("Called::updateDormCurrentCnt");
        return apiClient.patch("/api/admin/dormitories/current-count?studentId=" + studentId, dormitoryVO,
        		Integer.class
        );
    }

    public int updateDormCurrentCntDown(DormitoryVO dormitoryVO, String studentId) {
        log.info("Called::updateDormCurrentCntDown");
        return apiClient.patch("/api/admin/dormitories/current-down?studentId=" + studentId, dormitoryVO,
        		Integer.class
        );
    }
}
