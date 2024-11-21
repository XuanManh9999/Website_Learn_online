package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUsers {
    private Long total_user;
    private Long total_register_course;
    private Long total_unregister_course;
    private Long total_user_disable;
    private List<UserDTO> users;
}
