package com.toilamanh.toilamanh.dto.youtube;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Thumbnails {
    @JsonProperty("default")
    private ThumbnailDetail defaultThumbnail;
    private ThumbnailDetail medium;
    private ThumbnailDetail high;
}
