package com.toilamanh.toilamanh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "time")
    private String time;


    @Column(name = "duration")
    private Long duration;

    @Column(name = "duration_text")
    private String durationText;

    @Column(name = "videos_count")
    private Integer videosCount;

    @Column(name = "students_count")
    private Integer studentsCount;


    @Column(name = "prev_order")
    private Integer preOrder = 0;

    @ManyToOne
    @JoinColumn(name = "id_chapter")
    private Chapter chapter;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<UserWatchVideo> userWatchVideos = new ArrayList<>();
}
