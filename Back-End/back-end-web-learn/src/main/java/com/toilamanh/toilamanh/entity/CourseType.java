package com.toilamanh.toilamanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "course_type")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseType extends BaseEntity{
    @Column(name = "name_type", nullable = false)
    private String nameType;
}
