package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.entity.Course;
import com.toilamanh.toilamanh.service.interfac.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/v1/course")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseController {
    CourseService courseService;
    @PostMapping(value = "")
    public ResponseEntity<?> addCourse(@RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(courseService.addCourse(courseRequest));
    }
}
