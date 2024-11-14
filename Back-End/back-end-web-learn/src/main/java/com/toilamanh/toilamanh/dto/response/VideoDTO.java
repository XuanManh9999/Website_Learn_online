package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

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

    private Integer featuredVideo;

    private String time;

    private Integer preOrder;

    private Integer isUserWatchVideo;
}
