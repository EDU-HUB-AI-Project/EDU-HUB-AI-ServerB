package kr.hcnc.service.admin;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.TransportVO;

@Service("adminTransportService")
public class AdminTransportService extends EgovAbstractServiceImpl {

	private static final Logger log = LoggerFactory.getLogger(AdminTransportService.class);

	@Resource(name = "apiClient")
	private ApiClient apiClient;

	public List<TransportVO> selectTransportList() {
		log.info("Called :: selectTransportList()");
		return apiClient.get("/api/admin/transport",
				new ParameterizedTypeReference<List<TransportVO>>() {});
	}

	public TransportVO selectTransportById(String transportId) {
		log.info("Called :: selectTransportById({})", transportId);
		return apiClient.get("/api/admin/transport/" + transportId, TransportVO.class);
	}

	public int insertTransport(TransportVO transportVO) {
		log.info("Called :: insertTransport()");
		Integer result = apiClient.post("/api/admin/transport", transportVO, Integer.class);
		return result != null ? result : 0;
	}

	public int updateTransport(String transportId, TransportVO transportVO) {
		log.info("Called :: updateTransport({})", transportId);
		transportVO.setTransportId(transportId);
		Integer result = apiClient.put("/api/admin/transport/" + transportId, transportVO, Integer.class);
		return result != null ? result : 0;
	}

	public int deleteTransport(String transportId) {
		log.info("Called :: deleteTransport({})", transportId);
		Integer result = apiClient.delete("/api/admin/transport/" + transportId, null, Integer.class);
		return result != null ? result : 0;
	}
}
