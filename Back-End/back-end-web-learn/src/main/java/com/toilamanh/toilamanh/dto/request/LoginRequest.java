package com.toilamanh.toilamanh.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class LoginRequest {
    @NotBlank(message = "UserName is required")
    private String userName;
    @NotBlank(message = "Password is required")
    private String password;
}
