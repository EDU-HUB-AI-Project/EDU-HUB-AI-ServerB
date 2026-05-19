package kr.hcnc.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	private static final Logger log = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/main.do")
	public String mainPage() {
		log.info("MainController :: /main.do");
		return "main/main";
	}
	
	@RequestMapping(value = "/badge.do")
	public String badgePage() {
		log.info("MainController :: /badge.do");
		return "badge/badgePage";
	}
	
	@RequestMapping(value = "/guide.do")
	public String guidePage() {
		log.info("MainController :: /guide.do");
		return "guide/guidePage";
	}
}