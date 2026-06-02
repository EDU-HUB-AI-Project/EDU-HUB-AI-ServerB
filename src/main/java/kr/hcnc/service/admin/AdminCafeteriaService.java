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
import kr.hcnc.vo.CafeteriaVO;

@Service("adminCafeteriaService")
public class AdminCafeteriaService extends EgovAbstractServiceImpl {

    @Resource(name = "apiClient")
    private ApiClient apiClient;

    private static final Logger log = LoggerFactory.getLogger(AdminCafeteriaService.class);

    // 선택 달 전체 조회
    public List<CafeteriaVO> selectCafeteriaSummary(String date) {
        log.info("Called :: selectCafeteriaSummary()");
        return apiClient.get(
                "/api/admin/cafeteria?date=" + date,
                new ParameterizedTypeReference<List<CafeteriaVO>>() {}
        );
    }

    // 일일 메뉴 전체 조회
    public List<CafeteriaVO> selectCafeteriaDetail(String date) {
        log.info("Called :: selectCafeteriaDetail()");
        return apiClient.get(
                "/api/admin/cafeteria/detail?date=" + date,
                new ParameterizedTypeReference<List<CafeteriaVO>>() {}
        );
    }

    // 일일 메뉴 등록
    public Map<String, Object> insertCafeteria(CafeteriaVO cafeteriaVO) {
        log.info("Called :: insertCafeteria()");
        return apiClient.post(
                "/api/admin/cafeteria",
                cafeteriaVO,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    // 일일 메뉴 수정
    public Map<String, Object> updateCafeteria(String cafeteriaId, CafeteriaVO cafeteriaVO) {
        log.info("Called :: updateCafeteria()");
        return apiClient.put(
                "/api/admin/cafeteria/" + cafeteriaId,
                cafeteriaVO,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    // 일일 메뉴 삭제
    public Map<String, Object> deleteCafeteria(String cafeteriaId) {
        log.info("Called :: deleteCafeteria()");
        return apiClient.delete(
                "/api/admin/cafeteria/" + cafeteriaId,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }
}