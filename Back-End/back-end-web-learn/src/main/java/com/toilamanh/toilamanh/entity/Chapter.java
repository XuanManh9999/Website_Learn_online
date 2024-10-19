package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "chapter")
@Getter
@Setter
public class Chapter extends BaseEntity{
    @Column(name = "title_chapter")
    private String title;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_course")
    private Course course;

    @OneToMany(mappedBy = "chapter")
    private List<Video> videos;
}
