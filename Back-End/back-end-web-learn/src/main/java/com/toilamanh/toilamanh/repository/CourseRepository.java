package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT MAX (c.orderNumber) FROM Course c")
    Integer findMaxOrderNumber();

    Optional<Course> findCourseByIdAndActive(Long id, Integer active);

    @Query("SELECT COUNT (c.id) FROM  Course  c WHERE  c.active = 0")
    Integer allCourseByNoneActive();
}
