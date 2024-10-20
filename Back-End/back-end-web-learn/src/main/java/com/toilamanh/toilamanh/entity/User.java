package com.toilamanh.toilamanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseEntity implements UserDetails {
    @Column(name = "user_name", nullable = false,  unique = true)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    private String email;

    @Column(name = "point")
    private Double point = 0D;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public String getPassword() {
        return this.password;
    }
}
