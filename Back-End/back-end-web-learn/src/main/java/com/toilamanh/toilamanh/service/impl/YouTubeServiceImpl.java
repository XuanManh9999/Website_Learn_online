package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.youtube.YouTubeResponse;
import com.toilamanh.toilamanh.service.interfac.YouTubeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class YouTubeServiceImpl implements YouTubeService {
    @Value("${youtube.api_url}")
    private String API_URL;

    @Value("${youtube.api_key}")
    private String API_KEY;

    private final RestTemplate restTemplate;
    public YouTubeServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @Override
    public YouTubeResponse getVideoDetails(String videoID) {
        String url = API_URL + "?id=" + videoID + "&key=" + API_KEY + "&part=snippet,contentDetails,statistics";
        return restTemplate.getForObject(url, YouTubeResponse.class);
    }
}
