package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseTypeRepository extends JpaRepository<CourseType, Long> {
    // Hoặc nếu muốn dùng tham số:
    @Query("SELECT c FROM CourseType c WHERE c.active = :active")
    List<CourseType> findAllByActive(@Param("active") Integer active);
    Optional<CourseType> findByIdAndActive(Long id, Integer active);
    Optional<CourseType> findByNameTypeAndActive(String name, Integer active);
}
