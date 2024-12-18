package com.toilamanh.toilamanh.entity;

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
    @Column(name = "slug")
    private String slug;
    @Column(name = "level_course")
    private String level = "Cơ bản";
    @Column(name = "author")
    private String author = "Xuân Mạnh";
    @Column(name = "author_img", columnDefinition = "TEXT")
    private String author_img;
    private Integer orderNumber = 0;
    @Column(name = "featured_course")
    private Integer featuredCourse = 0;
    @Column(name ="pre_order")
    private Integer preOrder = 0;
    @Column(name ="desc_html", columnDefinition = "TEXT")
    private String descHtml = "";
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_type_code")
    private CourseType courseType;
    @ManyToOne
    @JoinColumn(name = "id_map")
    private Map map;
    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chapter> chapterList;
    @OneToMany(mappedBy = "course")
    private List<UserRegisterCourse> userRegisterCourses;
}
