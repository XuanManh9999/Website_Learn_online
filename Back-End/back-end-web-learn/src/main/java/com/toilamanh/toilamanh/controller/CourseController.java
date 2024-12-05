package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/v1/courses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseController {
    CourseService courseService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllCourse(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "limit", required = false) Integer limit
    ) {
        return ResponseEntity.ok().body(courseService.getAllCourse(page, limit));
    }

    @PostMapping(value = "")
    public ResponseEntity<?> addCourse(@RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(courseService.addCourse(courseRequest));
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllCourses(@RequestParam(name = "IdUser", required = false) Long IdUser) {
        return ResponseEntity.ok(courseService.getAllCourses(IdUser));
    }

    @GetMapping("/{IdCourse}")
    public ResponseEntity<?> getCourseById(@PathVariable(name = "IdCourse") Long Id) {
        return ResponseEntity.ok().body(courseService.getCourseById(Id));
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/{IdCourse}/{IdUser}")
    public ResponseEntity<?> getCourseByIdUser(@PathVariable(name = "IdCourse") Long IdCourse, @PathVariable(name = "IdUser") Long IdUser) {
        return ResponseEntity.ok().body(courseService.getCourseByIdUserAndIdCourse(IdUser, IdCourse));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{IdCourse}")
    public ResponseEntity<?> deleteCourse(@PathVariable(name = "IdCourse") Long IdCourse) {
        if (IdCourse == null) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("ID course is required")
                            .build()
            );
        }
        return ResponseEntity.ok().body(courseService.deleteCourse(IdCourse));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public ResponseEntity<?> updateCourse(@RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok().body(courseService.updateCourse(courseRequest));
    }
 }
