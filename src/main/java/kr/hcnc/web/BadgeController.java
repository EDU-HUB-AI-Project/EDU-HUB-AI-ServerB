package kr.hcnc.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.hcnc.service.BadgeService;

@Controller
public class BadgeController {

	@Resource(name = "badgeService")
	private BadgeService badgeService;
	
	@RequestMapping(value = "/searchStudent.do")
	@ResponseBody
	public List<Map<String, Object>> selectStudent(String param) {
		System.out.println("BadgeController :: /searchStudent.do");
		
		if(param == null || param.isEmpty()) {
			return new ArrayList<>();
		}
		
		if(!param.matches("^[0-9]{6}$")) {
			return new ArrayList<>();
		}
		
		List<Map<String, Object>> list = badgeService.selectStudents(param);
		System.out.println("BadgeController :: list = " + list);
		return list;
	}
	
	@RequestMapping(value = "/studentDetail.do")
	@ResponseBody
	public Map<String, Object> selectStudentDetail(String param) {
		System.out.println("BadgeController :: /studentDetail.do");
		Map<String, Object> map = badgeService.selectStudentDetail(param);
		System.out.println("/studentDetail.do :: map = " + map);
		return map;
	}
	
	@RequestMapping(value = "/guide.do")
	public String guidePage() {
		System.out.println("MainController :: /guide.do");
		return "guide/guidePage";
	}
	
	@RequestMapping(value = "/updateStudent.do")
	@ResponseBody
	public Map<String, Object> updateStudentStatus(String param) {
		System.out.println("BadgeController :: /updateStudentStatus.do");
		Map<String, Object> map = badgeService.updateStudentStatus(param);
		System.out.println("/updateStudentStatus.do :: map = " + map);
		return map;
	}
}
