package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.ClassroomVO;

@Service("adminClassroomService")
public class AdminClassroomService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminClassroomService.class);
	
	public List<ClassroomVO> selectClassroom() {
		log.info("Called :: selectClassroom()");
		return apiClient.get(
				"/api/admin/classroom",
				new ParameterizedTypeReference<List<ClassroomVO>>() {}
				);
	}
	
	
	// selectClassroomById
	public ClassroomVO selectClassroomById(String classroomId) {
		log.info("Called :: selectClassroomById()");
		return apiClient.get(
				"/api/admin/classroom/" + classroomId,
				ClassroomVO.class
				);
	}
	// insertClassroom
	public int insertClassroom(ClassroomVO classroomVO) {
		log.info("Called :: insertClassroom()");
		return apiClient.post(
				"/api/admin/classroom",
				classroomVO,
				Integer.class
				);
	}
	
	// updateClassroom
	public int updateClassroom(String classroomId, ClassroomVO classroomVO) {
		log.info("Called :: updateClassroom()");
		return apiClient.put(
				"/api/admin/classroom/" + classroomId,
				classroomVO,
				Integer.class
				);
	}
	
	public int deleteClassroom(String classroomId) {
		log.info("Called ::: deleteClassroom()");
		return apiClient.delete(
				"/api/admin/classroom/" + classroomId,
				null,
				Integer.class
				);
	}
}
