package kr.hcnc.web.kiosk;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.hcnc.service.kiosk.ClassroomService;

@Controller
@RequestMapping("/facility")
public class ClassroomController {

	@Resource(name = "classroomService")
	private ClassroomService classroomService;
	
	private static final Logger log = LoggerFactory.getLogger(ClassroomController.class);
	
	@GetMapping("/classroom.do")
	public String classroomPage(Model model) {
		log.info("Called :: /facility/classroom.do");
		model.addAttribute("classroomList", classroomService.selectClassroom());
		return "facility/classroom/classroomPage";
	}
}
