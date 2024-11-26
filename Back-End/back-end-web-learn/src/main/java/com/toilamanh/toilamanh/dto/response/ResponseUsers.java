package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUsers {
    private Long total_user;
    private Integer total_register_course;
    private Long total_unregister_course;
    private Long total_user_disable;
    private List<UserDTO> users;
}
