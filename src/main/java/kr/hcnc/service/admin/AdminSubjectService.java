package kr.hcnc.service.admin;

import java.util.List;

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
	
	public int insertSubject(SubjectVO subjectVO) {
		log.info("Called :: insertSubject()");
		return apiClient.post(
				"/api/admin/subject",
				subjectVO,
				Integer.class
				);
	}
	
	public int updateSubject(String subjectId, SubjectVO subjectVO) {
		log.info("Called :: updateSubject()");
		return apiClient.put(
				"/api/admin/subject/" + subjectId,
				subjectVO,
				Integer.class
				);
	}
	
	public int deleteSubject(String subjectId) {
		log.info("Called :: deleteSubject()");
		return apiClient.delete(
				"/api/admin/subject/" + subjectId,
				null,
				Integer.class
				);
	}
}
