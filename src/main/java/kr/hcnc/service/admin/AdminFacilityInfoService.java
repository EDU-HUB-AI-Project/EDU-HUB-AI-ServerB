package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.FacilityInfoVO;

@Service("adminFacilityInfoService")
public class AdminFacilityInfoService extends EgovAbstractServiceImpl {

	private static final Logger log = LoggerFactory.getLogger(AdminFacilityInfoService.class);

	@Resource(name = "apiClient")
	private ApiClient apiClient;

	public List<FacilityInfoVO> selectFacilityList() {
		log.info("Called :: selectFacilityList()");
		return apiClient.get("/api/admin/facilityInfo",
				new ParameterizedTypeReference<List<FacilityInfoVO>>() {});
	}

	public FacilityInfoVO selectFacilityById(String facilityId) {
		log.info("Called :: selectFacilityById({})", facilityId);
		return apiClient.get("/api/admin/facilityInfo/" + facilityId, FacilityInfoVO.class);
	}

	public int insertFacility(FacilityInfoVO facilityInfoVO) {
		log.info("Called :: insertFacility()");
		Integer result = apiClient.post("/api/admin/facilityInfo", facilityInfoVO, Integer.class);
		return result != null ? result : 0;
	}

	public int updateFacility(String facilityId, FacilityInfoVO facilityInfoVO) {
		log.info("Called :: updateFacility({})", facilityId);
		facilityInfoVO.setFacilityId(facilityId);
		Integer result = apiClient.put("/api/admin/facilityInfo/" + facilityId, facilityInfoVO, Integer.class);
		return result != null ? result : 0;
	}

	public int deleteFacility(String facilityId) {
		log.info("Called :: deleteFacility({})", facilityId);
		Integer result = apiClient.delete("/api/admin/facilityInfo/" + facilityId, null, Integer.class);
		return result != null ? result : 0;
	}
}
