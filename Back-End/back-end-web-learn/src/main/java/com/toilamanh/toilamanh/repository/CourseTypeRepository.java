package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseTypeRepository extends JpaRepository<CourseType, Long> {
    Optional<CourseType> findByIdAndActive(Long id, Integer active);
}
