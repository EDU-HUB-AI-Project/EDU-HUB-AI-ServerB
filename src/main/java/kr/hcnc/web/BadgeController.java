package kr.hcnc.web;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.fdl.property.EgovPropertyService;
import kr.hcnc.service.BadgeService;
import kr.hcnc.validator.RequestValidator;

@Controller
public class BadgeController {

	@Resource(name = "badgeService")
	private BadgeService badgeService;
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;
	
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
	
	@RequestMapping(value = "/badge/print.do", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> printBadge(@RequestParam String param) {
		
		Map<String, Object> result = new HashMap<>();
		String chromePath = propertiesService.getString("chrome.path");
		String printOutputPath = propertiesService.getString("badge.print.output");
		try {
			String printUrl = propertiesService.getString("Badge.PrintServerUrl") + "/badgeLabel.do?param=" + param;
			String outputFile = printOutputPath + "badge_" + param + ".pdf";
			
			File outputDif = new File(printOutputPath);
			if(!outputDif.exists()) {
				outputDif.mkdirs();
			}
			
			ProcessBuilder pb = new ProcessBuilder(
				    chromePath,
				    "--headless",
				    "--disable-gpu",
				    "--no-sandbox",
				    "--no-margins",
				    "--print-to-pdf-no-header",
				    "--run-all-compositor-stages-before-draw",
				    "--virtual-time-budget=3000",
				    "--paper-width=3.37",
				    "--paper-height=2.13",
				    "--print-to-pdf=" + outputFile,
				    printUrl
				);
			pb.start().waitFor(30, TimeUnit.SECONDS);
			
			Map<String, Object> detail = badgeService.selectStudentDetail(param);
			result.put("status", "success");
			result.put("data", detail);
		}
		catch(Exception e) {
			log.error("Badge print failed", e);
			result.put("status", "error");
			result.put("message", "출력 중 오류가 발생하였습니다.");
		}
		
		return result;
	}
	
	@RequestMapping(value = "/badgeLabel.do", method = RequestMethod.GET)
	public String badgeLabel(@RequestParam String param, Model model) {
		Map<String, Object> detail = badgeService.selectStudentDetail(param);
		model.addAttribute("data", detail);
		return "badge/badgeLabel";
	}
}







