package kr.hcnc.util;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("apiClient")
public class ApiClient {
	
	private RestTemplate restTemplate = new RestTemplate();
	private String baseUrl = "http://localhost:8081/";

	public <T> T get(String url, Class<T> responseType) {
		return restTemplate.getForObject(baseUrl + url, responseType);
	}
	
	public <T> T post(String url, Class<T> responseType) {
		return restTemplate.postForObject(baseUrl + url, null, responseType);
	}
}
