package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseResponse {
    private Long id;
    private String name;
    private String image;
    private String coverPhoto;
    private Double price;
    private Double prevPrice;
    private String description;
    private Double studyTime;
    private String level;
    private Long duration;
    private String durationText;
    private Integer videosCount;
    private Integer studentsCount;
    private Integer isUserRegister;
    private String author;
    private String author_img;
    private Integer orderNumber = 0;
    private Integer featuredCourse;
    private CourseTypeDTO courseType;
    private Integer totalUserWatchVideo;
    private Integer active;
    private String slug;
    private List<ChapterDTO> chapterList;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
