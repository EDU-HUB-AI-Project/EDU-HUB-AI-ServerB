package kr.hcnc.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import kr.hcnc.util.ApiClient;

@Service("facilityService")
public class FacilityService extends EgovAbstractServiceImpl{
	
	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	@Resource(name = "bisApiService")
	private BisApiService bisApiService;
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;

	private static final Logger log = LoggerFactory.getLogger(FacilityService.class);
	
	// 구내식당
	public List<Map<String, Object>> selectCafeteriaList() {
		log.info("FacilityService :: selectCafeteriaList");
		
		return apiClient.get(
				"/api/info/cafe",
				List.class
				);
	}
	
	// 교통 정보
	public List<Map<String, Object>> selectTransportList(String stopId) {
		log.info("FacilityService :: selectTransportList");
		try {
			return bisApiService.getBusArrival(stopId);
		}
		catch(Exception e) {
			log.error("BIS API 호출 실패 : " + e);
			return new ArrayList<>();
		}
	}
	
	public List<Map<String, Object>> getBusByDest(String dest) {
		log.info("FacilityService :: getBusByDest{}", dest);
		
		// 정류장 id들 받아오기
		String[] stopIds = propertiesService.getString("Bis." + dest + ".StopIds").split("\\|");
		log.info("getBusByDest StopIds :: {}", Arrays.toString(stopIds));
		List<Map<String, Object>> result = new ArrayList<>();
		
		for(String stopId : stopIds) {

			// 목적지 받아오기 (station, terminal)
			String key = "Bis." + dest + "." + stopId.trim();
			String[] routes = propertiesService.getString(key).split("\\|");
			Set<String> routeSet = new HashSet<>(Arrays.asList(routes));
			
			log.info("getBusByDest ROUTES :: {}", Arrays.toString(routes));
			
			try {
				List<Map<String, Object>> busList = bisApiService.getBusArrival(stopId.trim());
				
				for(Map<String, Object> bus : busList) {
					if(routeSet.contains(bus.get("routeNm"))) {
						result.add(bus);
					}
				}
			}
			catch(Exception e) {
				log.error("BIS API 호출 실패 -stopId = {}", stopId, e);
			}
		}
		
		log.info("gutBusByDest result :: {}", result);
		
		/*
		Map<노선번호, Map<Key, Value>>
		{
			  "5005" : { routeNm: "5005", arrivalTime: "600", stopNm: "안전보건공단 동서발전" },
			  "217"  : { routeNm: "217",  arrivalTime: "900", stopNm: "안전보건공단 동서발전" },
			  "728"  : { routeNm: "728",  arrivalTime: "300", stopNm: "안전보건공단 동서발전" }
			}
		*/
		Map<String, Map<String, Object>> fastest = new LinkedHashMap<>();		// 순서 유지를 위해 LinkedHashMap 사용
		
		Iterator<Map<String, Object>> iterator = result.iterator();
		while(iterator.hasNext()) {
			Map<String, Object> bus = iterator.next();
			if(Integer.parseInt((String) bus.get("arrivalTime")) <= 300) {
				iterator.remove();
			}
		}
		
		result.sort(new Comparator<Map<String, Object>>() {

			@Override
			public int compare(Map<String, Object> a, Map<String, Object> b) {
				// TODO Auto-generated method stub
				int timeA = Integer.parseInt((String) a.get("arrivalTime")) + 300;		// 도보시간 5분으로 하드코딩 변경 가능성 있음
				int timeB = Integer.parseInt((String) b.get("arrivalTime")) + 300;
				return Integer.compare(timeA, timeB);
			}
			
		});
		
		for(Map<String, Object> bus : result) {
			String routeNm = (String) bus.get("routeNm");
			if(!fastest.containsKey(routeNm)) {
				fastest.put(routeNm, bus);
			}
		}
		log.info("getBusByDest fastest :: {}", fastest);
		
		/*
		{ routeNm: "5005", arrivalTime: "600", stopNm: "..." }
		{ routeNm: "217",  arrivalTime: "900", stopNm: "..." }
		{ routeNm: "728",  arrivalTime: "300", stopNm: "..." }
		*/
		return new ArrayList<>(fastest.values());
	}
	
//	// 흡연장소
//	public List<Map<String, Object>> selectSmokingAreaList() {
//		System.out.println("FacilityService :: selectSmokingAreaList");
//		return facilityMapper.selectSmokingAreaList();
//	}
//	
//	// 강의실
//	public List<Map<String, Object>> selectClassroomList() {
//		System.out.println("FacilityService :: selectClassroomList");
//		return facilityMapper.selectClassroomList();
//	}
//	

}
