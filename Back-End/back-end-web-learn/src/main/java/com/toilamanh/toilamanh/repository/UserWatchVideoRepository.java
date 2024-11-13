package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.UserWatchVideo;
import com.toilamanh.toilamanh.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserWatchVideoRepository extends JpaRepository<UserWatchVideo, Long> {
    boolean existsByUserIdAndVideoId(Long userId, Long videoId);
}
