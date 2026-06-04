package kr.hcnc.service.kiosk;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.property.EgovPropertyService;
import kr.hcnc.util.ApiClient;
import kr.hcnc.vo.ClassroomVO;

@Service("classroomService")
public class ClassroomService extends EgovAbstractServiceImpl {

	@Resource(name = "apiClient")
	private ApiClient apiClient;
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;
	
	private static final Logger log = LoggerFactory.getLogger(ClassroomService.class);
	
	public List<ClassroomVO> selectClassroom() {
		log.info("Called :: selectClassroom()");
		return apiClient.get(
				"/api/classroom",
				new ParameterizedTypeReference<List<ClassroomVO>>() {}
				);
	}
}
