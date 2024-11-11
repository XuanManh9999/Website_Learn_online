package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.entity.CourseType;

public interface CourseTypeService {
    ApiResponse getAllCourseTypes();
    ApiResponse getCourseTypeById(Long ID);
    ApiResponse addCourseType(CourseType courseType);
    ApiResponse updateCourseType(CourseType courseType);
    ApiResponse deleteCourseType(Long ID);
}
