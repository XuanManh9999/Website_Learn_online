package com.toilamanh.toilamanh.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseTypeDTO {
    private Long id;
    private String nameType;
}
