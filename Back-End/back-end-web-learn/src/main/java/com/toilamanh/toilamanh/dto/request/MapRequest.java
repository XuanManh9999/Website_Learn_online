package com.toilamanh.toilamanh.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MapRequest {
    private Long id;
    private String name;
    private String description;
}
