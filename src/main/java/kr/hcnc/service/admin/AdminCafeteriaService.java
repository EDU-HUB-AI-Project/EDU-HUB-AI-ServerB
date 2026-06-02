package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.CafeteriaVO;

@Service("adminCafeteriaService")
public class AdminCafeteriaService extends EgovAbstractServiceImpl{
	
	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(AdminCafeteriaService.class);
	
	// 선택 달 전체 조회
	public List<CafeteriaVO> selectCafeteriaSummary(String date) {
		log.info("Called :: selectCafeteriaSummary()");
		return apiClient.get(
				"api/admin/cafeteria?date=",
				new ParameterizedTypeReference<List<CafeteriaVO>>() {}
		);
	}
}
