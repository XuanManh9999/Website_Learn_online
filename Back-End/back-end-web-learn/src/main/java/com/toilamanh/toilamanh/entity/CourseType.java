package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "course_type")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseType extends BaseEntity{
    @Column(name = "name_type", nullable = false)
    private String nameType;

    @Column(name = "order_number")
    private Integer orderNumber;

    @OneToMany(mappedBy = "courseType", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses;
}
