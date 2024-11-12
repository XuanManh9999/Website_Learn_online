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
import java.util.Optional;

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
            List<CourseType> courseTypes = courseTypeRepository.findAllByActive(1);
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

                    if (courseTypeDelete.isPresent()) {
                        courseTypeDelete.get().setActive(1);
                        courseTypeRepository.save(courseTypeDelete.get());
                        return ApiResponse.builder()
                                .status(HttpStatus.CREATED.value())
                                .message("Khởi tạo loại khóa hoc thành công")
                                .build();
                    }else {
                        CourseType courseTypeEntity = new CourseType();
                        courseTypeEntity.setNameType(nameType);
                        courseTypeEntity.setActive(1);
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

}
