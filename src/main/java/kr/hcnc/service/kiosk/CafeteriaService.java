package kr.hcnc.service.kiosk;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;

@Service
public class CafeteriaService extends EgovAbstractServiceImpl{
	
	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(CafeteriaService.class);
	
	public List<Map<String, Object>> selectCafeteriaList(String date) {
		log.info("Called :: selectCafeteriaList = {}", date);
		return apiClient.get(
				"/api/admin/cafeteria/detail" + date,
				new ParameterizedTypeReference<List<Map<String,Object>>>() {}
		);
	}

}
