package kr.hcnc.web.kiosk;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.hcnc.service.kiosk.CafeteriaService;

@Controller
@RequestMapping("/facility")
public class CafeteriaController {
	
	@Resource(name = "cafeteriaService")
	private CafeteriaService cafeteriaService;
	
	private static final Logger log = LoggerFactory.getLogger(CafeteriaController.class);
	
	@GetMapping("/cafeteria.do")
	public String cafeteriaPage() {
		log.info("Called :: /facility/cafeteria.do");
		return "facility/cafeteria/cafeteriaPage";
	}
	
	@GetMapping("/cafeteria/list/{date}.do")
	@ResponseBody
	public List<Map<String, Object>> getCafeteriaList(@PathVariable String date) {
		log.info("Called :: /facility/cafeteria/list/{}.do", date);
		return cafeteriaService.selectCafeteriaList(date);
	}
}
