package kr.hcnc.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import java.net.URL;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

@Service("bisApiService")
public class BisApiService {

	@Value("${Bis.ServiceKey}")
	private String BIS_KEY;
	
	@Value("${Bis.BaseUrl}")
	private String BASE_URL;
	
	public List<Map<String, Object>> getBusArrival(String stopId) throws Exception {
		String url = BASE_URL + "getBusArrivalInfo.xo"
				+ "?serviceKey=" + BIS_KEY
				+ "&stopid=" + stopId
				+ "&pageNo=1&numOfRows=20";
		String xml = callApi(url);
		
		return parseArrival(xml);
	}
	
	private String callApi(String apiUrl) throws Exception {
		HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(5000);
		conn.setReadTimeout(5000);
		
		try(BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"))) {
			
			StringBuilder sb = new StringBuilder();
			String line;
			
			while((line = br.readLine()) != null) {
				sb.append(line);
			}
			return sb.toString();
		}
		finally {
			conn.disconnect();
		}
	}
	
	private List<Map<String, Object>> parseArrival(String xml) throws Exception {
		List<Map<String, Object>> result = new ArrayList<>();
		DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		Document doc = builder.parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));
		
		NodeList rows = doc.getElementsByTagName("row");
		
		for(int i = 0; i < rows.getLength(); i++) {
			Element row = (Element) rows.item(i);
			Map<String, Object> item = new HashMap<>();
			
			item.put("routeNm",      getVal(row, "ROUTENM"));
            item.put("arrivalTime",  getVal(row, "ARRIVALTIME"));
            item.put("prevStopCnt",  getVal(row, "PREVSTOPCNT"));
            item.put("stopNm",       getVal(row, "STOPNM"));
            result.add(item);
		}
		return result;
	}
	
	private String getVal(Element el, String tag) {
		NodeList nl = el.getElementsByTagName(tag);
		return nl.getLength() > 0 ? nl.item(0).getTextContent() : "";
	}
}
