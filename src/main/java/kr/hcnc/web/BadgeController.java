package kr.hcnc.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.hcnc.service.BadgeService;
import kr.hcnc.validator.RequestValidator;

@Controller
public class BadgeController {

	@Resource(name = "badgeService")
	private BadgeService badgeService;
	
	private static final Logger log = LoggerFactory.getLogger(BadgeController.class);
	
	@RequestMapping(value = "/searchStudent.do")
	@ResponseBody
	public List<Map<String, Object>> selectStudent(String param) {
		log.info("Called :: /searchStudent.do");
		
		if(!RequestValidator.isValidBirthDate(param))
			return new ArrayList<>();
		
		List<Map<String, Object>> list = badgeService.selectStudents(param);
		log.info("list = {}", list);
		return list;
	}
	
	@RequestMapping(value = "/studentDetail.do")
	@ResponseBody
	public Map<String, Object> selectStudentDetail(String param) {
		log.info("Called :: /studentDetail.do");
		
		if(!RequestValidator.isValidStudentId(param))
			return new HashMap<>();
		
		Map<String, Object> map = badgeService.selectStudentDetail(param);

		log.info("map = {}", map);
		return map;
	}
	
	@RequestMapping(value = "/updateStudent.do")
	@ResponseBody
	public Map<String, Object> updateStudentStatus(String param) {
		log.info("Called :: /updateStudentStatus.do");
		
		if(!RequestValidator.isValidStudentId(param)) {
			Map<String, Object> result = new HashMap<>();
			result.put("status", "fail");
			result.put("message", "잘못된 요청입니다.");
			return result;
		}
		
		Map<String, Object> map = badgeService.updateStudentStatus(param);
		log.info("map = {}", map);
		return map;
	}
}
