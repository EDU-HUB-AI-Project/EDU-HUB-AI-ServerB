package kr.hcnc.service.admin;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.CafeteriaVO;

@Service("adminCafeteriaService")
public class AdminCafeteriaService extends EgovAbstractServiceImpl {

    @Resource(name = "apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminCafeteriaService.class);

    @SuppressWarnings("serial")
	public List<Map<String, Object>> selectCafeteriaSummary(String date) {
        log.info("Called :: selectCafeteriaSummary() date = {}", date);
        
        List<CafeteriaVO> rawList = apiClient.get(
                "/api/admin/cafeteria/" + date,
                new ParameterizedTypeReference<List<CafeteriaVO>>() {}
        );
        
        Map<String, Map<String, Object>> summaryMap = new LinkedHashMap<>();
        
        for (CafeteriaVO vo : rawList) {
        	String mealDate = vo.getMealDate();
        	String mealType = vo.getMealType();
        	
        	summaryMap.putIfAbsent(mealDate, new LinkedHashMap<String, Object>(){{
        		put("mealDate", mealDate);
        		put("BREAKFAST", "X");
        		put("LUNCH", "X");
        		put("DINNER", "X");
        		put("details", new ArrayList<>());
        	}});
        	
        	boolean hasMenu = vo.getMenu() != null
        			&& !vo.getMenu().trim().isEmpty()
        			&& !vo.getMenu().trim().equals("[]");
        	boolean isOpen = "N".equals(vo.getMealClosed());
        	
        	if(isOpen && hasMenu) {
        		summaryMap.get(mealDate).put(mealType, "0");
        	}
        	
        	Map<String, Object> detail = new LinkedHashMap<>();
        	detail.put("cafeteriaId", vo.getCafeteriaId());
        	detail.put("mealType", vo.getMealType());
        	detail.put("mealDate", vo.getMealDate());
        	detail.put("menu", vo.getMenu());
        	detail.put("mealClosed", vo.getMealClosed());
        	((List<Map<String, Object>>) summaryMap.get(mealDate).get("details")).add(detail);
        	
        }
        return new ArrayList<>(summaryMap.values());
    }

    public Map<String, Object> insertCafeteria(List<CafeteriaVO> cafeteriaList) {
        log.info("Called :: insertCafeteria() - size = {}", cafeteriaList != null ? cafeteriaList.size() : 0);
        return apiClient.post(
                "/api/admin/cafeteria",
                cafeteriaList,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    public int updateCafeteria(String cafeteriaId, CafeteriaVO cafeteriaVO) {
        log.info("Called :: updateCafeteria()");
        return apiClient.put(
                "/api/admin/cafeteria/" + cafeteriaId,
                cafeteriaVO,
                Integer.class
        );
    }

    public int deleteCafeteria(String cafeteriaId) {
        log.info("Called :: deleteCafeteria()");
        return apiClient.delete(
                "/api/admin/cafeteria/" + cafeteriaId,
                null,
                Integer.class
        );
    }
}