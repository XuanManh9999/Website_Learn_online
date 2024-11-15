package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Chapter;
import com.toilamanh.toilamanh.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT MAX(v.orderNumber) FROM Video v where v.chapter = :chapter")
    public Integer getOrderNumberMaxByChapter(Chapter chapter);
    Optional<Video> findVideoByIdAndActive(Long id, Integer active);

    @Query("SELECT COALESCE(SUM(v.duration), 0) FROM Video v where v.chapter.id = :idChapter")
    Long sumTotalDurationByChapter(@Param("idChapter") Long idChapter);

}
