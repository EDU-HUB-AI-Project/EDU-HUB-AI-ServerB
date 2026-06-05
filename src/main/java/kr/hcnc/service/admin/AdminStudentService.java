package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.StudentVO;

@Service("adminStudentService")
public class AdminStudentService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminStudentService.class);
	
	public List<StudentVO> selectStudent() {
		log.info("Called :: selectStudent()");
		return apiClient.get(
				"/api/admin/student",
				new ParameterizedTypeReference<List<StudentVO>>() {}
				);
	}
	
	public StudentVO selectStudentById(String studentId) {
		log.info("Called :: selectStudentById");
		return apiClient.get(
				"/api/admin/student/" + studentId,
				StudentVO.class
				);
	}
	
	public int insertStudent(StudentVO studentVO) {
		log.info("Called :: insertStudent");
		return apiClient.post(
				"/api/admin/student",
				studentVO,
				Integer.class
				);
	}
	
	public int updateStudent(String studentId, StudentVO studentVO) {
		log.info("Called :: updateStudent");
		return apiClient.put(
				"/api/admin/student/" + studentId,
				studentVO,
				Integer.class
				);
	}

	public int deleteStudent(String studentId) {
		log.info("Called :: deleteStudent");
		return apiClient.delete(
				"/api/admin/student/" + studentId,
				null,
				Integer.class
				);
	}
}
