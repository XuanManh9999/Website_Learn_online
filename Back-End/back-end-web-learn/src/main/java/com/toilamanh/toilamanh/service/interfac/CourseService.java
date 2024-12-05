package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;

public interface CourseService {
    ApiResponse addCourse(CourseRequest courseRequest);
    ApiResponse getAllCourse(Integer page, Integer limit);
    ApiResponse getAllCourses(Long IdUser);
    ApiResponse getCourseById(Long Id);
    ApiResponse getCourseByIdUserAndIdCourse(Long IdUser, Long IdCourse);
    ApiResponse deleteCourse(Long IdCourse);
    ApiResponse updateCourse(CourseRequest courseRequest);
}
