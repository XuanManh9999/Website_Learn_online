package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.CourseTypeDTO;

public interface CourseTypeService {
    ApiResponse getAllCourseTypes();
    ApiResponse getCourseTypeById(Long ID);
    ApiResponse CUCourseType(CourseTypeDTO courseTypeDTO);
    ApiResponse deleteCourseType(Long ID);
    ApiResponse getAllCourseTypeData();
}
