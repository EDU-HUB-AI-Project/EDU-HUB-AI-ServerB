package kr.hcnc.util;



import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import javax.net.ssl.SSLContext;

@Component("apiClient")
public class ApiClient {
	
	private RestTemplate restTemplate;
	
	@Value("${Globals.ApiClient}")
	private String baseUrl;
	
	@Value("${Globals.ApiSecretKey}")
	private String apiSecretKey;
	
	
	@PostConstruct
	public void init() throws Exception {
		SSLContext sslContext = SSLContextBuilder.create()
			    .loadTrustMaterial((chain, authType) -> true)
			    .build();
		
		CloseableHttpClient httpClient = HttpClients.custom()
										.setSSLContext(sslContext)
										.build();
		
		this.restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory(httpClient));
	}
	
	private HttpHeaders createHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Api-Secret", apiSecretKey);
		return headers;
	}

	public <T> T get(String url, Class<T> responseType) {
//        HttpEntity<?> entity = new HttpEntity<>(createHeaders());
//        return restTemplate.exchange(baseUrl + url, HttpMethod.GET, entity, responseType).getBody();
		HttpEntity<?> entity = new HttpEntity<>(createHeaders());
		return restTemplate.exchange(baseUrl + url, HttpMethod.GET, entity, responseType).getBody();
    }

    public <T> T post(String url, Object requestBody, Class<T> responseType) {
        HttpEntity<?> entity = new HttpEntity<>(requestBody, createHeaders());
        return restTemplate.postForObject(baseUrl + url, entity, responseType);
    }
    
    public <T> T put(String url, Object requestBody, Class<T> responseType) {
    	HttpEntity<?> entity = new HttpEntity<>(requestBody, createHeaders());
    	return restTemplate.exchange(baseUrl + url, HttpMethod.PUT, entity, responseType).getBody();
    }
    
    public <T> T patch(String url, Object requestBody, Class<T> responseType) {
    	HttpEntity<?> entity = new HttpEntity<>(requestBody, createHeaders());
    	return restTemplate.exchange(baseUrl + url, HttpMethod.PATCH, entity, responseType).getBody();
    }
    
    public <T> T delete(String url, Object requestBody, Class<T> responseType) {
    	HttpEntity<?> entity = new HttpEntity<>(requestBody, createHeaders());
    	return restTemplate.exchange(baseUrl + url,  HttpMethod.DELETE, entity, responseType).getBody();
    }
}
