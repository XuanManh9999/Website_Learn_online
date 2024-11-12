package com.toilamanh.toilamanh.dto.youtube;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Snippet {
    private String publishedAt;
    private String channelId;
    private String title;
    private String description;
    private Thumbnails thumbnails;
    private String channelTitle;
    private String categoryId;
    private String liveBroadcastContent;
    private Localized localized;
}
