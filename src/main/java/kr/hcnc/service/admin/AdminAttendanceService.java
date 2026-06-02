package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.AttendVO;

@Service("adminAttendanceService")
public class AdminAttendanceService extends EgovAbstractServiceImpl { // EgovAbstractServiceImpl를 상속하는 이유 AOP로 설정되어 있는 객체를 통하여 
	                                                                    // Controller와 Service 스캔 효율 증가
	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminAttendanceService.class);
	
	public List<AttendVO> getAttend(String studentId, String eduId, String attendDate, String status) {
		log.info("Called::getAttend()");
		String url = "/api/admin/attendances?";
		if(studentId != null) url += "studentId=" + studentId + "&";
		if(eduId != null) url += "eduId=" + eduId + "&";
		if(attendDate != null) url += "attendDate=" + attendDate + "&";
		if(status != null) url += "status=" + status + "&";
		return apiClient.get(url,
				new ParameterizedTypeReference<List<AttendVO>>() {});
	}

	public int updateAttendMsg(String studentId, AttendVO attendVO) {
		log.info("Called :: getAttendanceById()");
		return apiClient.patch("/api/admin/attendances/" + studentId, attendVO,
			Integer.class
		);
	}
}
