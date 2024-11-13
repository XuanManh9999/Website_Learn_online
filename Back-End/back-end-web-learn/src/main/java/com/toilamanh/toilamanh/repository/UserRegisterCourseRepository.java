package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.UserRegisterCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRegisterCourseRepository extends JpaRepository<UserRegisterCourse, Long> {
    boolean  existsByUserIdAndCourseIdAndActive(Long userId, Long courseId, Integer active);
    Integer countByUserIdAndCourseId(Long userId, Long courseId);
    Integer countByCourseId(Long courseId);
}
