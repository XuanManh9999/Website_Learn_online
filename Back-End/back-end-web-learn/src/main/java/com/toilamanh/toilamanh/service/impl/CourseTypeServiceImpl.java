package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.CourseTypeDTO;
import com.toilamanh.toilamanh.entity.CourseType;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.repository.CourseTypeRepository;
import com.toilamanh.toilamanh.service.interfac.CourseTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class CourseTypeServiceImpl implements CourseTypeService {
    CourseTypeRepository courseTypeRepository;
    ModelMapper modelMapper;

    @Override
    public ApiResponse getAllCourseTypes() {
        try {
            List<CourseType> courseTypes = courseTypeRepository.findAll();
            List<CourseTypeDTO> courseTypeDTOS =  new ArrayList<>();
            for (CourseType courseType : courseTypes) {
                CourseTypeDTO courseTypeDTO = modelMapper.map(courseType, CourseTypeDTO.class);
                courseTypeDTOS.add(courseTypeDTO);
            }
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin loại khóa học thành công")
                    .result(courseTypeDTOS)
                    .build();
        }catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse getCourseTypeById(Long ID) {
        try {
            CourseType courseType = courseTypeRepository.findByIdAndActive(ID, 1).orElseThrow(() -> new OurException("Không tìm thấy loại khóa học theo ID tương ứng"));
            CourseTypeDTO courseTypeDTO = modelMapper.map(courseType, CourseTypeDTO.class);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .result(courseTypeDTO)
                    .message("Lấy thông tin loại khóa học thành công")
                    .build();
        }catch (OurException ourException) {
            throw ourException;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse addCourseType(CourseType courseType) {
        return null;
    }

    @Override
    public ApiResponse updateCourseType(CourseType courseType) {
        return null;
    }

    @Override
    public ApiResponse deleteCourseType(Long ID) {
        return null;
    }
}
