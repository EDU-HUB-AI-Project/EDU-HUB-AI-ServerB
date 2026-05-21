package kr.hcnc.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("apiClient")
public class ApiClient {
	
	private RestTemplate restTemplate = new RestTemplate();
	
	@Value("${Globals.ApiClient}")
	private String baseUrl;

	public <T> T get(String url, Class<T> responseType) {
		return restTemplate.getForObject(baseUrl + url, responseType);
	}
	
	public <T> T post(String url, Object requestBody, Class<T> responseType) {
		return restTemplate.postForObject(baseUrl + url, requestBody, responseType);
	}
}
