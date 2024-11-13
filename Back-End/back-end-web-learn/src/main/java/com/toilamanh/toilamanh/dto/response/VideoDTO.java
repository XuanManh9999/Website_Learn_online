package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.toilamanh.toilamanh.entity.UserWatchVideo;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideoDTO {
    private Long id;
    private String title;

    private String urlVideo;

    private String description;

    private String docMore;
    private Long duration;
    private String durationText;
    private Integer orderNumber;

    private Integer featuredVideo = 0;

    private String time;

    private Integer preOrder = 0;

    private Integer isUserWatchVideo;
}
