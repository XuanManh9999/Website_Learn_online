package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepository extends JpaRepository<Map,Long> {
}
