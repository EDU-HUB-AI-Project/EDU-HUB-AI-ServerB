package kr.hcnc.web.kiosk;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.fdl.property.EgovPropertyService;
import kr.hcnc.service.kiosk.FacilityService;

@Controller
public class FacilityController {
	
	@Resource(name = "facilityService")
	private FacilityService facilityService;
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;
	
	private static final Logger log = LoggerFactory.getLogger(FacilityController.class);
	
	// 버튼 2 메인
	@RequestMapping(value = "/facility.do")
	public String facilityPage() {
		log.info("Called :: /facility.do");
		return "facility/facilityPage";
	}
	
	// 구내식당
	@RequestMapping(value = "/facility/cafeteria.do")
	public String cafeteriaPage(Model model) {
	    log.info("Called :: /facility/cafeteria.do");
	    try {
	        List<Map<String, Object>> list = facilityService.selectCafeteriaList();
	        log.info("결과 : {}", list);
	        model.addAttribute("cafeteriaList", list);
	    } catch (Exception e) {
	        log.error("구내식당 정보 조회 실패", e);
	        model.addAttribute("cafeteriaList", new java.util.ArrayList<>());
	        model.addAttribute("serverError", true);
	    }
	    return "facility/cafeteria/cafeteriaPage";
	}
	
	// 흡연장소
	@RequestMapping(value = "/facility/smoking.do")
	public String smokingPage() {
		log.info("Called :: /facility/smoking.do");
		return "facility/smoking/smokingPage";
	}
	// 교통정보
	@RequestMapping(value = "/facility/transport.do")
	public String transportPage(Model model) {
		log.info("Called :: /facility/transport.do");
		model.addAttribute("kakaoMapKey", propertiesService.getString("kakao.map.key"));
		return "facility/transport/transportPage";
	}
	
	@RequestMapping(value = "/facility/transport/bus.do")
	@ResponseBody
	public List<Map<String, Object>> getBusInfo(@RequestParam String dest) {
		log.info("Called :: /facility/transport/bus.do?dest{}", dest);
		return facilityService.getBusByDest(dest);
	}
}