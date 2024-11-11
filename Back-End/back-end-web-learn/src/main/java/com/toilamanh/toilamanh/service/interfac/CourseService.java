package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;

public interface CourseService {
    ApiResponse addCourse(CourseRequest courseRequest);
}
