package com.toilamanh.toilamanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "banner")
@Getter
@Setter
public class Banner extends BaseEntity{
    @Column(name = "url_banner", columnDefinition = "TEXT")
    private String urlBanner;
    @Column(name = "alt_banner")
    private String altBanner;
}
