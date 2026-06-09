package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.FacilityInfoVO;

@Service("adminFacilityInfoService")
public class AdminFacilityInfoService extends EgovAbstractServiceImpl {

	private static final Logger log = LoggerFactory.getLogger(AdminFacilityInfoService.class);

	@Resource(name = "apiClient")
	private ApiClient apiClient;

	@Resource(name = "facilityImageService")
	private FacilityImageService facilityImageService;

	public List<FacilityInfoVO> selectFacilityList() {
		log.info("Called :: selectFacilityList()");
		return apiClient.get("/api/admin/facilityInfo",
				new ParameterizedTypeReference<List<FacilityInfoVO>>() {});
	}

	public FacilityInfoVO selectFacilityById(String facilityId) {
		log.info("Called :: selectFacilityById({})", facilityId);
		return apiClient.get("/api/admin/facilityInfo/" + facilityId, FacilityInfoVO.class);
	}

	public int insertFacility(FacilityInfoVO facilityInfoVO) {
		log.info("Called :: insertFacility()");
		Integer result = apiClient.post("/api/admin/facilityInfo", facilityInfoVO, Integer.class);
		return result != null ? result : 0;
	}

	public int updateFacility(String facilityId, FacilityInfoVO facilityInfoVO, ServletContext servletContext) {
		log.info("Called :: updateFacility({})", facilityId);
		FacilityInfoVO previous = selectFacilityById(facilityId);
		facilityInfoVO.setFacilityId(facilityId);
		Integer result = apiClient.put("/api/admin/facilityInfo/" + facilityId, facilityInfoVO, Integer.class);
		int updated = result != null ? result : 0;
		if (updated > 0) {
			releaseObsoleteImage(previous, facilityInfoVO, servletContext);
		}
		return updated;
	}

	public int deleteFacility(String facilityId, ServletContext servletContext) {
		log.info("Called :: deleteFacility({})", facilityId);
		FacilityInfoVO previous = selectFacilityById(facilityId);
		Integer result = apiClient.delete("/api/admin/facilityInfo/" + facilityId, null, Integer.class);
		int deleted = result != null ? result : 0;
		if (deleted > 0) {
			releaseImageIfPresent(previous, servletContext);
		}
		return deleted;
	}

	// 수정, 삭제 시 불필요 이미지 정리(soft delete)
	private void releaseObsoleteImage(FacilityInfoVO previous, FacilityInfoVO updated, ServletContext servletContext) {
		if (previous == null) {
			return;
		}

		String oldPath = previous.getImagePath();
		if (oldPath == null || oldPath.trim().isEmpty()) {
			return;
		}

		String newPath = updated != null ? updated.getImagePath() : null;
		if (newPath != null && oldPath.equals(newPath)) {
			return;
		}

		releaseImagePath(oldPath, servletContext);
	}

	private void releaseImageIfPresent(FacilityInfoVO facility, ServletContext servletContext) {
		if (facility == null) {
			return;
		}
		releaseImagePath(facility.getImagePath(), servletContext);
	}

	private void releaseImagePath(String imagePath, ServletContext servletContext) {
		try {
			facilityImageService.softDeleteFacilityImage(imagePath, servletContext);
		} catch (Exception ex) {
			log.warn("Facility image soft-delete failed for {}: {}", imagePath, ex.getMessage());
		}
	}
}
