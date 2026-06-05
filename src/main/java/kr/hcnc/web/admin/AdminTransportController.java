package kr.hcnc.web.admin;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminTransportService;
import kr.hcnc.vo.TransportVO;

@RestController
@RequestMapping("/admin/transport")
public class AdminTransportController {

	private static final Logger log = LoggerFactory.getLogger(AdminTransportController.class);

	@Resource(name = "adminTransportService")
	private AdminTransportService adminTransportService;

	@GetMapping
	public ResponseEntity<?> getTransportList() {
		log.info("Called :: GET /admin/transport");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminTransportService.selectTransportList());
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{transportId}")
	public ResponseEntity<?> getTransport(@PathVariable String transportId) {
		log.info("Called :: GET /admin/transport/{}", transportId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminTransportService.selectTransportById(transportId));
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<?> insertTransport(@RequestBody TransportVO transportVO) {
		log.info("Called :: POST /admin/transport");
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminTransportService.insertTransport(transportVO));
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@PutMapping("/{transportId}")
	public ResponseEntity<?> updateTransport(@PathVariable String transportId,
			@RequestBody TransportVO transportVO) {
		log.info("Called :: PUT /admin/transport/{}", transportId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminTransportService.updateTransport(transportId, transportVO));
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{transportId}")
	public ResponseEntity<?> deleteTransport(@PathVariable String transportId) {
		log.info("Called :: DELETE /admin/transport/{}", transportId);
		Map<String, Object> result = new HashMap<>();
		result.put("status", 200);
		result.put("data", adminTransportService.deleteTransport(transportId));
		return ResponseEntity.ok(result);
	}
}
