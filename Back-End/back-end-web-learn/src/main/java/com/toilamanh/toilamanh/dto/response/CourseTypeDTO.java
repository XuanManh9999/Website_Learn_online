package com.toilamanh.toilamanh.dto.response;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseTypeDTO {
    private Long id;
    private String nameType;
    private Integer orderNumber;
    private List<CourseResponse> courseResponseList;
}
