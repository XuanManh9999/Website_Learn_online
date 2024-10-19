package com.toilamanh.toilamanh.entity;

import com.toilamanh.toilamanh.service.impl.CourseServiceImpl;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "course")
@Getter
@Setter
public class Course extends BaseEntity {
    @Column(name = "name_course")
    private String name;

    @Column(name = "image_course", columnDefinition = "TEXT")
    private String image;
    @Column(name = "cover_photo_course", columnDefinition = "TEXT")
    private String coverPhoto;

    @Column(name = "price")
    private Double price;
    @Column(name = "prev_price")
    private Double prevPrice;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "study_time")
    private Double studyTime;

    @Column(name = "level_course")
    private String level = "Cơ bản";

    @Column(name = "author")
    private String author = "Đội ngũ Java-team";

    @Column(name = "icon_course")
    private String icon;

    @Column(name = "order_number")
    private Integer orderNumber = 0;
    public void prePersist() {
        CourseServiceImpl courseService = new CourseServiceImpl();
        this.orderNumber = courseService.getNextOrderNumber();
    }
    @Column(name = "featured_course")
    private Integer featuredCourse = 0;

    @ManyToOne
    @JoinColumn(name = "id_type_code")
    private CourseType courseType;

    @ManyToOne
    @JoinColumn(name = "id_map")
    private Map map;

    @OneToMany(mappedBy = "course")
    private List<Chapter> chapterList;


    @OneToMany(mappedBy = "course")
    private List<UserRegisterCourse> userRegisterCourses;
}
