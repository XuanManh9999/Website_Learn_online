package com.toilamanh.toilamanh.dto.request;

import com.toilamanh.toilamanh.entity.CourseType;
import lombok.Data;

import java.util.List;

@Data
public class CourseRequest {
    private Long id;
    private String name;
    private String image;
    private String coverPhoto;
    private Double price;
    private Double prevPrice;
    private String description;
    private Double studyTime;
    private String level ;
    private String author ;
    private String author_img;
    private String icon;
    private Integer orderNumber ;
    private Integer featuredCourse ;
//    private CourseType courseType;
    private List<ChapterRequest> chapterList;

}
