package com.toilamanh.toilamanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "course_type")
@Entity
@Getter
@Setter
public class CourseType extends BaseEntity{
    @Column(name = "name_type", unique = true, nullable = false)
    private String nameType;
}
