package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT MAX (c.orderNumber) FROM Course c")
    public Long findMaxOrderNumber();
}
