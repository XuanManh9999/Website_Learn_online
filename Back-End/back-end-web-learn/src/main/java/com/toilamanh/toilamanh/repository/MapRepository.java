package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.CourseType;
import com.toilamanh.toilamanh.entity.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<Map,Long> {
    @Query("SELECT m.id, m.name, m.description, m.slug FROM Map m WHERE m.active = :active order by m.orderNumber")
    List<Map> findAllMapByActive(@Param("active") Integer active);
    @Query("SELECT COALESCE(MAX(m.orderNumber), 0)  FROM Map m")
    Integer findMaxOrder();


    Optional<Map> findByIdAndActive(Long id, Integer active);
    Optional<Map> findByNameAndActive(String name, Integer active);
    List<Map> findAllByActive(Integer active);



}