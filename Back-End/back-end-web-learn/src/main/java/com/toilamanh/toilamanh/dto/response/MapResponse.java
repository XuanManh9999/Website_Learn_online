package com.toilamanh.toilamanh.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class MapResponse {
    private Long id;
    private String name;
    private String description;
    private List<CourseResponse> courses;
}
