package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Chapter;
import com.toilamanh.toilamanh.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT MAX(v.orderNumber) FROM Video v where v.chapter = :chapter")
    public Integer getOrderNumberByChapter(Chapter chapter);
}
