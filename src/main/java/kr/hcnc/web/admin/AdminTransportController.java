package kr.hcnc.web.admin;

import java.util.List;

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
	public ResponseEntity<List<TransportVO>> getTransportList() {
		log.info("Called :: GET /admin/transport");
		return ResponseEntity.ok(adminTransportService.selectTransportList());
	}

	@GetMapping("/{transportId}")
	public ResponseEntity<TransportVO> getTransport(@PathVariable String transportId) {
		log.info("Called :: GET /admin/transport/{}", transportId);
		return ResponseEntity.ok(adminTransportService.selectTransportById(transportId));
	}

	@PostMapping
	public ResponseEntity<Integer> insertTransport(@RequestBody TransportVO transportVO) {
		log.info("Called :: POST /admin/transport");
		int result = adminTransportService.insertTransport(transportVO);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@PutMapping("/{transportId}")
	public ResponseEntity<Integer> updateTransport(@PathVariable String transportId,
			@RequestBody TransportVO transportVO) {
		log.info("Called :: PUT /admin/transport/{}", transportId);
		return ResponseEntity.ok(adminTransportService.updateTransport(transportId, transportVO));
	}

	@DeleteMapping("/{transportId}")
	public ResponseEntity<Integer> deleteTransport(@PathVariable String transportId) {
		log.info("Called :: DELETE /admin/transport/{}", transportId);
		return ResponseEntity.ok(adminTransportService.deleteTransport(transportId));
	}
}
