package com.toilamanh.toilamanh.dto.request;

import com.toilamanh.toilamanh.entity.Course;
import lombok.Data;

import java.util.List;

@Data
public class ChapterRequest {
    private String title;
    private String description;
    private Course course;
    private List<VideoRequest> videos;
}
