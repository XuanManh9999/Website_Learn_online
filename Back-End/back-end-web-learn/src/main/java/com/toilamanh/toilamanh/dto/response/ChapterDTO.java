package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChapterDTO {
    private Long id;
    private Integer orderNumber;
    private String title;
    private String description;
    private Integer active;
    private Integer total_lesson;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VideoDTO> videos;
}
