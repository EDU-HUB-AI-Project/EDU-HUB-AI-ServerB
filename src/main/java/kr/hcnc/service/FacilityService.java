package kr.hcnc.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;

@Service("facilityService")
public class FacilityService extends EgovAbstractServiceImpl{
	
	@Resource(name = "apiClient")
	private ApiClient apiClient;

	private static final Logger log = LoggerFactory.getLogger(FacilityService.class);
	
	// 구내식당
	public List<Map<String, Object>> selectCafeteriaList() {
		log.info("FacilityService :: selectCafeteriaList");
		
		return apiClient.get(
				"/api/info/cafe",
				List.class
				);
	}
	
//	// 흡연장소
//	public List<Map<String, Object>> selectSmokingAreaList() {
//		System.out.println("FacilityService :: selectSmokingAreaList");
//		return facilityMapper.selectSmokingAreaList();
//	}
//	
//	// 강의실
//	public List<Map<String, Object>> selectClassroomList() {
//		System.out.println("FacilityService :: selectClassroomList");
//		return facilityMapper.selectClassroomList();
//	}
//	
//	// 교통 정보
//	public List<Map<String, Object>> selectTransportList() {
//		System.out.println("FacilityService :: selectTransportList");
//		return facilityMapper.selectTransportList();
//	}
}
