package kr.hcnc.web.admin;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.hcnc.service.admin.AdminDormitoryService;
import kr.hcnc.vo.DormAssignVO;
import kr.hcnc.vo.DormitoryVO;

@RestController
@RequestMapping("/admin/dorm")
public class AdminDormitoryController {
    @Resource(name="adminDormitoryService")
    private AdminDormitoryService adminDormitoryService;

    private static final Logger log = LoggerFactory.getLogger(AdminDormitoryController.class);
    
    @GetMapping
    public ResponseEntity<?> getDormRoomAssign(){
    	log.info("Called::gettDormAssign");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormAssign());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/combo-box")
    public ResponseEntity<?> getCmbDorm() {
    	log.info("Called :: GET /admin/dormitories/combo-box");
    	Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getCmbDorm());
    	return ResponseEntity.ok(result);
    }
    
    @GetMapping("/waiting")
    public ResponseEntity<?> getDormWaiting(){
    	log.info("Called::getDormWaiting");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormWaiting());
        return ResponseEntity.ok(result);
    }
    
 // =================== 삭제 예정 ==========================
    @GetMapping("/check-in")
    public ResponseEntity<?> getDormIn(){
    	log.info("Called::getDormIn");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormIn());
        return ResponseEntity.ok(result);
    }
 // =================== 삭제 예정 ==========================
    // 생활관 퇴실 조회
    @GetMapping("/check-out")
    public ResponseEntity<?> getDormOut(){
    	log.info("Called :: GET /api/admin/dormitories");
    	Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormOut());
    	return ResponseEntity.ok(result);
    }
    
    @GetMapping("/in-out")
    public ResponseEntity<?> getDormInOut(){
    	log.info("Called :: GET /admin/dorm/in-out");
    	Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormInOut());
    	return ResponseEntity.ok(result);
    }
    
    @GetMapping("/assign-status")
    public ResponseEntity<?> getDormRoomAssignStatus(@RequestParam(required=false) String dormitoryId){
        log.info("Called::gettDormRoomAssignStatus");
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.getDormRoomAssignStatus(dormitoryId));
        return ResponseEntity.ok(result);
    }
    
//    @GetMapping("/{dormitoryId}")
//    public ResponseEntity<?> getDormRoomAssignStatusById(@PathVariable String dormitoryId) {
//        log.info("Called :: GET /admin/dormitories/{}", dormitoryId);
//        Map<String, Object> result = new HashMap<>();
//        result.put("status", 200);
//        result.put("data", adminDormitoryService.getDormRoomAssignStatusById(dormitoryId));
//        return ResponseEntity.ok(result);
//    } 
    
    @PatchMapping("/{studentId}")
    public ResponseEntity<?> updateDormId(@PathVariable String studentId,
    											@RequestBody DormAssignVO dormAssignVO){
    	log.info("Called :: PATCH /admin/dormitories/{}", studentId);
        Map<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("data", adminDormitoryService.updateDormId(studentId, dormAssignVO));
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/max-count")
    public ResponseEntity<?> updateDormAssignMaxCnt (@RequestBody DormitoryVO dormitoryVO){
    	log.info("Called :: PATCH /admin/dormitories/max-count");
    	Map<String, Object> result = new HashMap<>();
    	result.put("status", 200);
    	result.put("data", adminDormitoryService.updateDormAssignMaxCnt(dormitoryVO));
    	return ResponseEntity.ok(result);
    }

    @PatchMapping("/current-count")
    public ResponseEntity<?> updateDormCurrentCnt (@RequestBody DormitoryVO dormitoryVO, @RequestParam String studentId) {
        log.info("Called :: PATCH /admin/dormitories/current-count");
    	Map<String, Object> result = new HashMap<>();
    	result.put("status", 200);
    	result.put("data", adminDormitoryService.updateDormCurrentCnt(dormitoryVO, studentId));
        return ResponseEntity.ok(result);
    }
    
    @PatchMapping("/current-down")
    public ResponseEntity<?> updateDormCurrentCntDown (@RequestBody DormitoryVO dormitoryVO, @RequestParam String studentId){
    	log.info("Called :: PATCH /admin/dormitories/current-down");
    	Map<String, Object> result = new HashMap<>();
    	result.put("status", 200);
    	result.put("data", adminDormitoryService.updateDormCurrentCntDown(dormitoryVO, studentId));
    	return ResponseEntity.ok(result);
    }
}
