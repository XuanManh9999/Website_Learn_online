package com.toilamanh.toilamanh.dto.youtube;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class YouTubeResponse {
    private String kind;
    private String etag;
    private List<Item> items;
}
