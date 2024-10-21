package com.toilamanh.toilamanh.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterRequest {
    private String email;
    private String username;
    private String password;
    private String confirmPassword;
}