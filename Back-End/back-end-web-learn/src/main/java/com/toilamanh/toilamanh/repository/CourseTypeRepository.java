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

    @Query(value = "SELECT ct FROM CourseType ct WHERE ct.active = :active")
    List<CourseType> allCourseTypes(@Param("active") Integer active);

    @Query("SELECT DISTINCT COUNT(ct.id)  FROM CourseType ct INNER JOIN Course c ON ct.id = c.courseType.id WHERE  ct.nameType = :nameType")
    Integer countQuantityByNameType(@Param("nameType") String nameType);

 }
