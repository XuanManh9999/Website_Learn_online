package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseEntity {
    @Column(name = "user_name", nullable = false,  unique = true)
    private String userName;

    @Column(name = "password", nullable = false,  unique = true)
    private String password;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    private String email;

    @Column(name = "point")
    private Double point;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "google")
    private String google;

    @Column(name = "phonenumber")
    private String phonenumber;

    @Column(name = "avatar", columnDefinition = "TEXT")
    private String avatar;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_photo", columnDefinition = "TEXT")
    private String cover_photo;

    @Column(name = "role")
    private String role = "USER";

    @OneToMany(mappedBy = "user")
    private List<Blog> blogList;

    @OneToMany(mappedBy = "user")
    private List<UserRegisterCourse> commentList;

}
