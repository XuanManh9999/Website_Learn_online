package com.toilamanh.toilamanh.service.interfac;


import com.toilamanh.toilamanh.dto.youtube.YouTubeResponse;

public interface YouTubeService {
    YouTubeResponse getVideoDetails(String videoID);
}
