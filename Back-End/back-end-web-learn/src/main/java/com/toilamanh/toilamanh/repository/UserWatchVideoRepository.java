package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.UserWatchVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserWatchVideoRepository extends JpaRepository<UserWatchVideo, Long> {
    boolean existsByUserIdAndVideoId(Long userId, Long videoId);

    @Query("SELECT COUNT(uwv.id) " +
            "FROM UserWatchVideo uwv " +
            "JOIN uwv.video v " +
            "JOIN v.chapter c " +
            "JOIN c.course co " +
            "WHERE co.id = :courseId AND uwv.user.id = :userId")
    Integer countUserWatchedVideos(Long courseId, Long userId);


    @Query("SELECT COUNT(uwv.id) " +
            "FROM UserWatchVideo uwv " +
            "JOIN uwv.video v " +
            "JOIN v.chapter c " +
            "WHERE c.id = :chapterId AND uwv.user.id = :userId")
    Integer countUserWatchedVideosInChapter(Long chapterId, Long userId);

}
