package kr.hcnc.web;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import kr.hcnc.service.FacilityService;

@Controller
public class FacilityController {
	
	@Resource(name = "facilityService")
	private FacilityService facilityService;
	
	// 버튼 2 메인
	@RequestMapping(value = "/facility.do")
	public String facilityPage() {
		System.out.println("FacilityController :: /facility.do");
		return "facility/facilityPage";
	}
	
	// 구내식당
	@RequestMapping(value = "/facility/cafeteria.do")
	public String cafeteriaPage(org.springframework.ui.Model model) {
		System.out.println("FacilityController :: /facility/cafeteria.do");
		List<Map<String, Object>> list = facilityService.selectCafeteriaList();
		System.out.println("결과 : " + list);
		model.addAttribute("cafeteriaList", list);
		return "facility/cafeteria/cafeteriaPage";
	}
	
	// 흡연장소
	@RequestMapping(value = "/facility/smoking.do")
	public String smokingPage() {
		System.out.println("FacilityController :: /facility/smoking.do");
		return "facility/smoking/smokingPage";
	}
	
	// 강의실 안내
	@RequestMapping(value = "/facility/classroom.do")
	public String classroomPage() {
		System.out.println("FacilityController :: /facility/classroom.do");
		return "facility/classroom/classroomPage";
	}
	
	// 교통정보
	@RequestMapping(value = "/facility/transport.do")
	public String transportPage() {
		System.out.println("FacilityController :: /facility/transport.do");
		return "facility/transport/transportPage";
	}
}