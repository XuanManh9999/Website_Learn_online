package com.toilamanh.toilamanh.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class VideoRequest {
    private Long id;
    private String title;

    private String urlVideo;

    private String description;

    private String docMore;

    private Integer orderNumber;

    private Integer featuredVideo;
}
