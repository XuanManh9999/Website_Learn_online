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
    Optional<CourseType> findByIdAndActive(Long id, Integer active);
    Optional<CourseType> findByNameTypeAndActive(String name, Integer active);
    List<CourseType> findAllByActive(Integer active);
    @Query("SELECT MAX(ct.orderNumber) FROM CourseType ct")
    Integer findMaxOrderNumber();
 }
