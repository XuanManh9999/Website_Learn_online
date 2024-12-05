package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
// Backend ->  Java (Spring boot, spring security, spring data jpa)

// Front-end Javascript -> (ReactJS, React router dom, React redux, Antd, scss)

// DB (mysql)

// Video lay url -> tu Youtube va xu ly logic lay video, title, do dai

@Entity
@Table(name = "map")
@Getter
@Setter
public class Map extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "slug")
    private String slug;

    @Column(name = "order_number")
    private int orderNumber;

    @OneToMany(mappedBy = "map", fetch = FetchType.EAGER)
    private List<Course> courseList;


}
