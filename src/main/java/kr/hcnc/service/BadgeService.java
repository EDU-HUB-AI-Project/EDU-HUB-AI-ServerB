package kr.hcnc.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;

@Service("badgeService")
public class BadgeService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;

	private static final Logger log = LoggerFactory.getLogger(BadgeService.class);
	
	public List<Map<String, Object>> selectStudents(String param) {
		log.info("BadgeService :: selectStudents()");
		return apiClient.get(
				"/api/student/search?birthDate=" + param, 
				List.class
				);
	}
	
	public Map<String, Object> selectStudentDetail(String param) {
		log.info("BadgeService :: selectStudentDetail()");
		return apiClient.get(
				"/api/student/detail?studentId=" + param,
				Map.class
				);
	}
	
	public Map updateStudentStatus(String param) {
		log.info("BadgeService :: updateStudentStatus()");
		return apiClient.post(
				"/api/student/update?studentId=" + param,
				Map.class
				);
	}
}
