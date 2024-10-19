package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.entity.Course;
import com.toilamanh.toilamanh.repository.CourseRepository;
import com.toilamanh.toilamanh.service.interfac.CourseService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseServiceImpl implements CourseService {
    CourseRepository courseRepository;
    @Transactional
    public Integer getNextOrderNumber() {
        // Lấy giá trị orderNumber lớn nhất từ cơ sở dữ liệu
        Long maxOrderNumber = courseRepository.findMaxOrderNumber();

        // Nếu chưa có khóa học nào, bắt đầu từ 0
        if (maxOrderNumber == null) {
            return 0;
        }

        // Cộng thêm 10 vào giá trị lớn nhất hiện có
        return maxOrderNumber.intValue() + 10;
    }
}
