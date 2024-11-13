package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    @Query("SELECT COUNT(v) FROM Chapter c JOIN c.videos v WHERE c.course.id = :courseId")
    Integer countTotalVideosByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT SUM(v.duration) FROM Chapter c JOIN c.videos v WHERE c.course.id = :courseId")
    Long getTotalDurationByCourseId(@Param("courseId") Long courseId);
}
