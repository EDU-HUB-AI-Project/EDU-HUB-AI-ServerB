package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.EduInfoVO;

@Service("adminEduInfoService")
public class AdminEduInfoService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminEduInfoService.class);
	
	public List<EduInfoVO> selectEduInfo() {
		log.info("Called :: selectEduInfo()");
		return apiClient.get(
				"/api/admin/eduInfo",
				new ParameterizedTypeReference<List<EduInfoVO>>() {}
				);
	}
	
	public EduInfoVO selectEduInfoById(String eduInfoId) {
		log.info("Called :: selectEduInfoById()");
		return apiClient.get(
				"/api/admin/eduInfo/" + eduInfoId,
				EduInfoVO.class
				);
	}
	
	public int insertEduInfo(EduInfoVO eduInfoVO) {
		log.info("Called :: insertEduInfo()");
		return apiClient.post(
				"/api/admin/eduInfo",
				eduInfoVO,
				Integer.class
				);
	}
	
	public int updateEduInfo(String eduInfoId, EduInfoVO eduInfoVO) {
		log.info("Called :: updateEduInfo()");
		return apiClient.put(
				"/api/admin/eduInfo/" + eduInfoId,
				eduInfoVO,
				Integer.class
				);
	}
	
	public int deleteEduInfo(String eduInfoId) {
		log.info("Called :: deleteEduInfo()");
		return apiClient.delete(
				"/api/admin/eduInfo/" + eduInfoId,
				null,
				Integer.class
				);
	}
}
