package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.CourseTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/course-type")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseTypeController {
    CourseTypeService courseTypeService;

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllCourseTypes() {
       return ResponseEntity.ok(courseTypeService.getAllCourseTypes());
    }
    @GetMapping(value = "/{IdTypeCourse}")
    public ResponseEntity<?> getCourseById(@PathVariable(value = "IdTypeCourse", required = false) Long Id) {
        if (Id != null) {
            return ResponseEntity.ok(courseTypeService.getCourseTypeById(Id));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Vui lòng cung cấp ID để tìm loại khóa học")
                .build());
    }
}
