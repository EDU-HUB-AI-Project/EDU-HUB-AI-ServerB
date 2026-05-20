package kr.hcnc.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class MainController {
	
	private static final Logger log = LoggerFactory.getLogger(MainController.class);
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;
	
	@RequestMapping(value = "/main.do")
	public String mainPage(Model model) {
		log.info("MainController :: /main.do");
		model.addAttribute("kakaoMapKey", propertiesService.getString("kakao.map.key"));
		return "main/main";
	}
	
	@RequestMapping(value = "/badge.do")
	public String badgePage() {
		log.info("MainController :: /badge.do");
		return "badge/badgePage";
	}
	
	@RequestMapping(value = "/guide.do")
	public String guidePage(Model model) {
		log.info("MainController :: /guide.do");
		model.addAttribute("kioskSite", propertiesService.getString("kiosk.site"));
		return "guide/guidePage";
	}
}