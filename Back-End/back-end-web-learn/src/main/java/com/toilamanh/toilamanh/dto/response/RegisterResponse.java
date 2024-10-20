package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterResponse {
    private Integer status;
    private String message;
    private UserDTO userDTO;
}
