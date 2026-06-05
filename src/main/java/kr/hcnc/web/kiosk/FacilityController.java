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
import kr.hcnc.vo.FacilityInfoVO;

@Controller
public class FacilityController {

	@Resource(name = "facilityService")
	private FacilityService facilityService;

	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;

	private static final Logger log = LoggerFactory.getLogger(FacilityController.class);

	@RequestMapping(value = "/facility.do")
	public String facilityPage() {
		log.info("Called :: /facility.do");
		return "facility/facilityPage";
	}

	@RequestMapping(value = "/facility/location.do")
	public String locationPage(Model model) {
		log.info("Called :: /facility/location.do");
		try {
			List<FacilityInfoVO> list = facilityService.selectFacilityLocationList();
			log.info("시설 위치 목록 : {}건", list != null ? list.size() : 0);
			model.addAttribute("facilityList", list != null ? list : new java.util.ArrayList<>());
		} catch (Exception e) {
			log.error("시설 위치 정보 조회 실패", e);
			model.addAttribute("facilityList", new java.util.ArrayList<>());
			model.addAttribute("serverError", true);
		}
		return "facility/location/locationPage";
	}

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
