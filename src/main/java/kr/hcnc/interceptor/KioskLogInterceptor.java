package kr.hcnc.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.hcnc.service.admin.AdminKioskLogService;
import kr.hcnc.vo.KioskLogVO;

public class KioskLogInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger log = LoggerFactory.getLogger(KioskLogInterceptor.class);
	
	private static final Map<String, String> PAGE_ACTION_MAP = new HashMap<>();
	
	static {
		PAGE_ACTION_MAP.put("/facility/classroom.do", "강의실 안내");
        PAGE_ACTION_MAP.put("/facility/transport.do", "교통정보");
        PAGE_ACTION_MAP.put("/facility/cafeteria.do", "구내식당");
        PAGE_ACTION_MAP.put("/facility/location.do",   "시설안내");
        PAGE_ACTION_MAP.put("/guide.do",   "교육생 안내");
	}
	
	@Resource(name = "adminKioskLogService")
	private AdminKioskLogService logService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String uri = request.getRequestURI();
		String action = PAGE_ACTION_MAP.get(uri);
		
		if(action != null) {
			try {
				KioskLogVO vo = new KioskLogVO();
				vo.setAction(action);
				logService.insertLog(vo);
			}
			catch(Exception e) {
				log.error("KioskLogInterceptor :: 로그 저장 실패 - {}", uri, e);
			}
		}
		
		return true;

	}

	
	
}
