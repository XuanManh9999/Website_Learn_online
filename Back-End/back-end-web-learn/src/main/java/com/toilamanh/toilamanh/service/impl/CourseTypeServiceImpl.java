package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.CourseResponse;
import com.toilamanh.toilamanh.dto.response.CourseTypeDTO;
import com.toilamanh.toilamanh.dto.response.CourseTypeResponse;
import com.toilamanh.toilamanh.entity.Course;
import com.toilamanh.toilamanh.entity.CourseType;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.repository.CourseRepository;
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
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional

public  class CourseTypeServiceImpl implements CourseTypeService {
    CourseTypeRepository courseTypeRepository;
    ModelMapper modelMapper;
    CourseServiceImpl courseServiceImpl;
    private final CourseRepository courseRepository;


    @Override
    public ApiResponse getAllCourseTypes() {
        try {
            CourseTypeResponse courseTypeResponse = new CourseTypeResponse();
            List<CourseTypeDTO> courseTypeDTOs = new ArrayList<>();

            List<CourseType> courseTypes = courseTypeRepository.findAllByActive(1);

            for (CourseType courseType : courseTypes) {
                CourseTypeDTO courseTypeDTO = new CourseTypeDTO();
                courseTypeDTO.setId(courseType.getId());
                courseTypeDTO.setNameType(courseType.getNameType());
                courseTypeDTO.setOrderNumber(courseType.getOrderNumber());

                List<CourseResponse> courseResponses = new ArrayList<>();
                for (Course course : courseType.getCourses()) {
                    Optional<Course> courseOptinal = courseRepository.findCourseByIdAndActive(course.getId(), 1);
                    if (!courseOptinal.isPresent()) {
                        continue;
                    }
                    CourseResponse courseResponse = courseServiceImpl.mapCourseToCourseResponse(courseOptinal.get(), null, 0, 0);
                    courseResponses.add(courseResponse);
                }
                courseTypeDTO.setCourseResponseList(courseResponses);
                courseTypeDTOs.add(courseTypeDTO);
            }
            List<CourseTypeDTO> sortOrderNumber =  courseTypeDTOs.stream()
                    .sorted(Comparator.comparing(CourseTypeDTO::getOrderNumber)) // Sắp xếp khóa học theo `order_number`
                    .collect(Collectors.toList());
            courseTypeResponse.setCourseTypeDTOList(sortOrderNumber);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin khóa học thành công")
                    .result(courseTypeResponse)
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
    public ApiResponse CUCourseType(CourseTypeDTO courseTypeDTO) {
        try {
            Long id = courseTypeDTO.getId();
            String nameType = courseTypeDTO.getNameType();
            if (id == null) {
                Optional<CourseType> courseType = courseTypeRepository.findByNameTypeAndActive(nameType, 1);
                if (courseType.isPresent()) {
                    return ApiResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("Đã tồn tại khóa học này vui lòng kiểm tra lại thông tin")
                            .build();
                }else {
                    Optional<CourseType> courseTypeDelete = courseTypeRepository.findByNameTypeAndActive(nameType, 0);
                    Integer max_order = courseTypeRepository.findMaxOrderNumber();
                    if (courseTypeDelete.isPresent()) {
                        courseTypeDelete.get().setActive(1);
                        if (max_order == null) {
                            courseTypeDelete.get().setOrderNumber(0);
                        }else {
                            courseTypeDelete.get().setOrderNumber(max_order + 10);
                        }
                        courseTypeRepository.save(courseTypeDelete.get());
                        return ApiResponse.builder()
                                .status(HttpStatus.CREATED.value())
                                .message("Khởi tạo loại khóa hoc thành công")
                                .build();
                    }else {
                        CourseType courseTypeEntity = new CourseType();
                        courseTypeEntity.setNameType(nameType);
                        courseTypeEntity.setActive(1);
                        if (max_order == null) {
                            courseTypeEntity.setOrderNumber(0);
                        }else {
                            courseTypeEntity.setOrderNumber(max_order + 10);
                        }
                        courseTypeRepository.save(courseTypeEntity);
                        return ApiResponse.builder()
                                .status(HttpStatus.CREATED.value())
                                .message("Khởi tạo loại khóa hoc thành công")
                                .build();
                    }
                }
            }else {
                courseTypeRepository.findByNameTypeAndActive(nameType, 1).orElseThrow(() -> new OurException("Đã tồn tại khóa định cập nhật vui lòng kiểm tra lại"));
                CourseType courseType = courseTypeRepository.findByIdAndActive(id, 1).orElseThrow(() -> new OurException("Không tìm thấy loại khóa học, vui lòng kiểm tra lại"));
                courseType.setNameType(nameType);
                courseType.setActive(1);
                courseTypeRepository.save(courseType);
                return ApiResponse.builder()
                        .status(HttpStatus.OK.value())
                        .message("Cập nhật thông tin loại khóa học thành công")
                        .build();
            }
        }catch (OurException ourException) {
            throw ourException;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse deleteCourseType(Long ID) {
        try {
            CourseType courseType = courseTypeRepository.findByIdAndActive(ID, 1).orElseThrow(() -> new OurException("Không tìm thấy loại khóa học tương ứng"));
            courseType.setActive(0);
            courseTypeRepository.save(courseType);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Xóa loại khóa học thành công")
                    .build();
        }catch (OurException ourException) {
            throw ourException;
        }catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse getAllCourseTypeData() {
       try {
            List<CourseType> courseTypes = courseTypeRepository.allCourseTypes(1);
            List<CourseTypeDTO> courseTypeDTOS = new ArrayList<>();
            for (CourseType courseType : courseTypes) {
                CourseTypeDTO courseTypeDTO = new CourseTypeDTO();
                courseTypeDTO.setId(courseType.getId());
                courseTypeDTO.setNameType(courseType.getNameType());
                courseTypeDTOS.add(courseTypeDTO);
            }
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy dữ liệu loại khóa học thành công")
                    .result(courseTypeDTOS)
                    .build();

       }catch (Exception ex) {
           throw ex;
       }
    }

}
