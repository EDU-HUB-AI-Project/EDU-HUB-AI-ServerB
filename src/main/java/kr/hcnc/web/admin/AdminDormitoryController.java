package kr.hcnc.web.admin;

import java.util.List;

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
import kr.hcnc.vo.DormitoryVO;

@RestController
@RequestMapping("/admin/dorm")
public class AdminDormitoryController {
    @Resource(name="adminDormitoryService")
    private AdminDormitoryService adminDormitoryService;

    private static final Logger log = LoggerFactory.getLogger(AdminDormitoryController.class);

    @GetMapping
    public ResponseEntity<List<DormitoryVO>> gettDormRoomAssignStatus(){
        log.info("Called::gettDormRoomAssignStatus");
        return ResponseEntity.ok(adminDormitoryService.gettDormRoomAssignStatus());
    }
    @GetMapping("/{dormitoryId}")
    public ResponseEntity<DormitoryVO> getDormRoomAssignStatusById(@PathVariable String dormitoryId) {
        log.info("Called :: GET /admin/dormitories/{}", dormitoryId);
        return ResponseEntity.ok(adminDormitoryService.getDormRoomAssignStatusById(dormitoryId));
    } 

    @PatchMapping("/max-count")
    public ResponseEntity<Integer> updateDormAssignMaxCnt (@RequestBody DormitoryVO dormitoryVO){
    	log.info("Called :: PATCH /admin/dormitories/max-count");
        int result = adminDormitoryService.updateDormAssignMaxCnt(dormitoryVO);
    	return ResponseEntity.ok(result);
    }

    @PatchMapping("/current-count")
    public ResponseEntity<Integer> updateDormCurrentCnt (@RequestBody DormitoryVO dormitoryVO, @RequestParam String studentId) {
        log.info("Called :: PATCH /admin/dormitories/current-count");
        int result = adminDormitoryService.updateDormCurrentCnt(dormitoryVO, studentId);
        return ResponseEntity.ok(result);
    }
    
    @PatchMapping("/current-down")
    public ResponseEntity<Integer> updateDormCurrentCntDown (@RequestBody DormitoryVO dormitoryVO, @RequestParam String studentId){
    	log.info("Called :: PATCH /admin/dormitories/current-down");
    	int result = adminDormitoryService.updateDormCurrentCntDown(dormitoryVO, studentId);
    	return ResponseEntity.ok(result);
    }
}
