package com.toilamanh.toilamanh.entity;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class UserWatchVideoId implements Serializable {
    private Long user;
    private Long video;
}
