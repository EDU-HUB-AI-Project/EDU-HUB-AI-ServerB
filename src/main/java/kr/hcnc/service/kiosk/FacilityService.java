package kr.hcnc.service.kiosk;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.FacilityInfoVO;
import kr.hcnc.vo.TransportVO;

@Service("facilityService")
public class FacilityService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;

	@Resource(name = "bisApiService")
	private BisApiService bisApiService;

	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;

	private static final Logger log = LoggerFactory.getLogger(FacilityService.class);

	public List<FacilityInfoVO> selectFacilityInfoList() {
		log.info("Called :: selectFacilityInfoList");
		return apiClient.get("/api/facilityInfo",
				new ParameterizedTypeReference<List<FacilityInfoVO>>() {});
	}

	/** 키오스크 시설 위치 탭용 (메뉴 전용 MENU_* 타입 제외) */
	public List<FacilityInfoVO> selectFacilityLocationList() {
		List<FacilityInfoVO> list = selectFacilityInfoList();
		if (list == null) {
			return new ArrayList<>();
		}
		return list.stream()
				.filter(f -> f.getFacilityType() == null
						|| !f.getFacilityType().startsWith("MENU_"))
				.collect(Collectors.toList());
	}

	public List<TransportVO> selectTransportInfoList() {
		log.info("Called :: selectTransportInfoList");
		return apiClient.get("/api/info/transport",
				new ParameterizedTypeReference<List<TransportVO>>() {});
	}

	public List<Map<String, Object>> selectCafeteriaList() {
		log.info("Called :: selectCafeteriaList");

		return apiClient.get(
				"/api/info/cafe",
				List.class);
	}

	public List<Map<String, Object>> selectTransportList(String stopId) {
		log.info("Called :: selectTransportList");
		try {
			return bisApiService.getBusArrival(stopId);
		} catch (Exception e) {
			log.error("BIS API 호출 실패 : " + e);
			return new ArrayList<>();
		}
	}

	public List<Map<String, Object>> getBusByDest(String dest) {
		log.info("Called :: getBusByDest{}", dest);

		String[] stopIds = propertiesService.getString("Bis." + dest + ".StopIds").split("\\|");
		log.info("getBusByDest StopIds :: {}", Arrays.toString(stopIds));
		List<Map<String, Object>> result = new ArrayList<>();

		for (String stopId : stopIds) {

			String key = "Bis." + dest + "." + stopId.trim();
			String[] routes = propertiesService.getString(key).split("\\|");
			Set<String> routeSet = new HashSet<>(Arrays.asList(routes));

			log.info("getBusByDest ROUTES :: {}", Arrays.toString(routes));

			try {
				List<Map<String, Object>> busList = bisApiService.getBusArrival(stopId.trim());

				for (Map<String, Object> bus : busList) {
					if (routeSet.contains(bus.get("routeNm"))) {
						result.add(bus);
					}
				}
			} catch (Exception e) {
				log.error("BIS API 호출 실패 -stopId = {}", stopId, e);
			}
		}

		log.info("gutBusByDest result :: {}", result);

		Map<String, Map<String, Object>> fastest = new LinkedHashMap<>();

		Iterator<Map<String, Object>> iterator = result.iterator();
		while (iterator.hasNext()) {
			Map<String, Object> bus = iterator.next();
			if (Integer.parseInt((String) bus.get("arrivalTime")) <= 300) {
				iterator.remove();
			}
		}

		result.sort(new Comparator<Map<String, Object>>() {

			@Override
			public int compare(Map<String, Object> a, Map<String, Object> b) {
				int timeA = Integer.parseInt((String) a.get("arrivalTime")) + 300;
				int timeB = Integer.parseInt((String) b.get("arrivalTime")) + 300;
				return Integer.compare(timeA, timeB);
			}

		});

		for (Map<String, Object> bus : result) {
			String routeNm = (String) bus.get("routeNm");
			if (!fastest.containsKey(routeNm)) {
				fastest.put(routeNm, bus);
			}
		}
		log.info("getBusByDest fastest :: {}", fastest);

		return new ArrayList<>(fastest.values());
	}
}
