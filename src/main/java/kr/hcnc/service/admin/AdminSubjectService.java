package kr.hcnc.service.admin;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.SubjectVO;

@Service("adminSubjectService")
public class AdminSubjectService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminSubjectService.class);
	
	public List<SubjectVO> selectSubject() {
		log.info("Called :: selectSubject()");
		return apiClient.get(
				"/api/admin/subject",
				new ParameterizedTypeReference<List<SubjectVO>>() {}
				);
	}
	
	public SubjectVO selectSubjectById(String subjectId) {
		log.info("Called :: selectSubjectById()");
		return apiClient.get(
				"/api/admin/subject/" + subjectId,
				SubjectVO.class
				);
	}
	
	public Map<String, Object> insertSubject(SubjectVO subjectVO) {
		log.info("Called :: insertSubject()");
		return apiClient.post(
				"/api/admin/subject",
				subjectVO,
				new ParameterizedTypeReference<Map<String, Object>>() {}
				);
	}
	
	public Map<String, Object> updateSubject(String subjectId, SubjectVO subjectVO) {
		log.info("Called :: updateSubject()");
		return apiClient.put(
				"/api/admin/subject/" + subjectId,
				subjectVO,
				new ParameterizedTypeReference<Map<String, Object>>() {}
				);
	}
	
	public void deleteSubject(String subjectId) {
		log.info("Called :: deleteSubject()");
		apiClient.delete(
				"/api/admin/subject/" + subjectId,
				null,
				Void.class
				);
	}
}
