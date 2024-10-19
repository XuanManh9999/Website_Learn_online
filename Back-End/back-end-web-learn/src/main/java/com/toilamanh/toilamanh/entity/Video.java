package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "video")
@Getter
@Setter
public class Video extends BaseEntity {
    @Column(name = "title")
    private String title;

    @Column(name = "url_video", columnDefinition = "TEXT")
    private String urlVideo;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "doc_more", columnDefinition = "TEXT")
    private String docMore;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "featured_video")
    private Integer featuredVideo = 0;

    @ManyToOne
    @JoinColumn(name = "id_chapter")
    private Chapter chapter;

}
