package com.toilamanh.toilamanh.dto.youtube;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {
    private String kind;
    private String etag;
    private String id;
    private Snippet snippet;
    private ContentDetails contentDetails;
    private Statistics statistics;
}
