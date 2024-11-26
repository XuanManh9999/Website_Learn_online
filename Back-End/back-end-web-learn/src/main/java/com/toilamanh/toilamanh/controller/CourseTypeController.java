package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.CourseTypeDTO;
import com.toilamanh.toilamanh.service.interfac.CourseTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping
    public ResponseEntity<?> CU_CourseType(@RequestBody CourseTypeDTO courseTypeDTO) {
        if (!courseTypeDTO.getNameType().equals("")) {
            return ResponseEntity.ok().body(courseTypeService.CUCourseType(courseTypeDTO));
        }else {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("Vui lòng cung cấp đầy đủ thông tin để tiếp tục")
                            .build()
            );
        }
    }
    @DeleteMapping("/{CourseTypeId}")
    public ResponseEntity<?> DeleteCourseType(@PathVariable(value = "CourseTypeId") Long Id) {
        if (Id != null) {
            return ResponseEntity.ok().body(courseTypeService.deleteCourseType(Id));
        }else {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("ID loại khóa học chưa được cấp")
                            .build()
            );
        }
    }
}
