package kr.hcnc.service.admin;

import java.util.ArrayList;
import java.util.Arrays;
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
    
    private static final List<String>MEAL_TYPE_ORDER = Arrays.asList("BREAKFAST", "LUNCH", "DINNER");

    @SuppressWarnings("serial")
	public List<Map<String, Object>> selectCafeteriaSummary(String date) {
        log.info("Called :: selectCafeteriaSummary() date = {}", date);
        
        List<CafeteriaVO> rawList = apiClient.get(
                "/api/admin/cafeteria?date=" + date,
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
        	}});
        	
        	boolean hasMenu = vo.getMenu() != null
        			&& !vo.getMenu().trim().isEmpty()
        			&& !vo.getMenu().trim().equals("[]");
        	boolean isOpen = "N".equals(vo.getMealClosed());
        	
        	if(isOpen && hasMenu) {
        		summaryMap.get(mealDate).put(mealType, "0");
        	}
        }
        return new ArrayList<>(summaryMap.values());
    }

    public List<CafeteriaVO> selectCafeteriaDetail(String date) {
        log.info("Called :: selectCafeteriaDetail() date = {}", date);
        
        List<CafeteriaVO> result = apiClient.get(
                "/api/admin/cafeteria/detail?date=" + date,
                new ParameterizedTypeReference<List<CafeteriaVO>>() {}
        );
        
        result.sort((a, b) -> {
        	int orderA = MEAL_TYPE_ORDER.indexOf(a.getMealType());
        	int orderB = MEAL_TYPE_ORDER.indexOf(b.getMealType());
        	return Integer.compare(orderA, orderB);
        });
        
        return result;
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