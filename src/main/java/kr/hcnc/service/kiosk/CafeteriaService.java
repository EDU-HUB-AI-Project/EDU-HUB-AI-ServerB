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

@Service("cafeteriaService")
public class CafeteriaService extends EgovAbstractServiceImpl{
	
	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	private static final Logger log = LoggerFactory.getLogger(CafeteriaService.class);
	
	public List<Map<String, Object>> selectCafeteriaList(String date) {
		log.info("Called :: selectCafeteriaList = {}", date);
		
		String monthDate = date.substring(0, 7);
		
		List<Map<String, Object>> allData = apiClient.get(
				"/api/admin/cafeteria/" + monthDate, 
				new ParameterizedTypeReference<List<Map<String,Object>>>() {}
		);
		
		return allData.stream()
				.filter(item -> date.equals(item.get("mealDate")))
				.collect(java.util.stream.Collectors.toList());
	}

}
