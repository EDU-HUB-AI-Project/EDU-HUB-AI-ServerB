package kr.hcnc.web;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, Object>> handelIllegalArgument(IllegalArgumentException e) {
		Map<String, Object> result = new HashMap<>();
		logger.warn("Invalid request", e);
		result.put("status", 400);
		result.put("message", e.getMessage());
		return ResponseEntity.ok(result);
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<Map<String, Object>>  handleMethodNotAllowed(HttpRequestMethodNotSupportedException  e) {
		Map<String, Object> result = new HashMap<>();
		logger.warn("Method not allowed", e);
		result.put("status", 405);
		result.put("message", "허용되지 않은 요청 방식입니다.");
		return ResponseEntity.ok(result);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleException(Exception e) {
		Map<String, Object> result = new HashMap<>();
		logger.error("Unexpected error", e);
		result.put("status", 500);
		result.put("message", "서버 오류가 발생했습니다.");
		return ResponseEntity.ok(result);
	}
}
