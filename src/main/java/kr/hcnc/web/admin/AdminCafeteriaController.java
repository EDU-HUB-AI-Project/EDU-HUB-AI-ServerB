package kr.hcnc.web.admin;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminCafeteriaService;
import kr.hcnc.vo.CafeteriaVO;

@RestController
@RequestMapping("/admin/cafeteria")
public class AdminCafeteriaController {

    @Resource(name = "adminCafeteriaService")
    private AdminCafeteriaService adminCafeteriaService;

    private static final Logger log = LoggerFactory.getLogger(AdminCafeteriaController.class);
    
    @GetMapping("")
    public ResponseEntity<List<Map<String, Object>>> getCafeteria(@RequestParam String date) {
        log.info("Called :: GET /admin/cafeteria?date={}", date);
        
        List<Map<String, Object>> result = adminCafeteriaService.selectCafeteriaSummary(date);
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail")
    public ResponseEntity<List<CafeteriaVO>> getCafeteriaDetail(@RequestParam String date) {
        log.info("Called :: GET /admin/cafeteria/detail?date={}", date);
        
        List<CafeteriaVO> result = adminCafeteriaService.selectCafeteriaDetail(date);
        
        return ResponseEntity.ok(result);
    }

    @PostMapping(produces = "application/json; charset=utf8")
    public ResponseEntity<?> insertCafeteria(@RequestBody List<CafeteriaVO> cafeteriaList) {
        log.info("Called :: POST /admin/cafeteria - size: {}", cafeteriaList != null ? cafeteriaList.size() : 0);
        
        Map<String, Object> result = adminCafeteriaService.insertCafeteria(cafeteriaList);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{cafeteriaId}")
    public ResponseEntity<?> updateCafeteria(@PathVariable String cafeteriaId, @RequestBody CafeteriaVO cafeteriaVO) {
        log.info("Called :: PUT /admin/cafeteria/{} - body: {}", cafeteriaId, cafeteriaVO);
        Map<String, Object> result = adminCafeteriaService.updateCafeteria(cafeteriaId, cafeteriaVO);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{cafeteriaId}")
    public ResponseEntity<?> deleteCafeteria(@PathVariable String cafeteriaId) {
        log.info("Called :: DELETE /admin/cafeteria/{}", cafeteriaId);
        Map<String, Object> result = adminCafeteriaService.deleteCafeteria(cafeteriaId);
        return ResponseEntity.ok(result);
    }
}