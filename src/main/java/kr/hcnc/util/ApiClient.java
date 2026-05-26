package kr.hcnc.util;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("apiClient")
public class ApiClient {
	
	private RestTemplate restTemplate = new RestTemplate();
	
	@Value("${Globals.ApiClient}")
	private String baseUrl;
	
	@Value("${Globals.ApiSecretKey}")
	private String apiSecretKey;
	
	private HttpHeaders createHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Api-Secret", apiSecretKey);
		return headers;
	}

	public <T> T get(String url, Class<T> responseType) {
		HttpEntity<?> entity = new HttpEntity<>(createHeaders());
		return restTemplate.exchange(baseUrl + url, HttpMethod.GET, entity, responseType).getBody();
	}
	
	public <T> T post(String url, Object requestBody, Class<T> responseType) {
		HttpEntity<?> entity = new HttpEntity<>(requestBody, createHeaders());
		return restTemplate.postForObject(baseUrl + url, entity, responseType);
	}
}
