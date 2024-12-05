package com.toilamanh.toilamanh.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CourseResponseAll {
    private Integer total;
    private List<CourseResponse> courses;
    private Integer pageNumber;
    private Integer pageSize;
    private Integer totalCourseFree;
    private Integer totalCourseAvailable;
    private Integer totalCourseNonActive;
}
