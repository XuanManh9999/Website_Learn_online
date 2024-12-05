package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MapResponse {
    private Long id;
    private String name;
    private String description;
    private String order;
    private List<CourseResponse> courses;
}
