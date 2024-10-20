package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.InfoRequest;
import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.dto.response.UserDTO;
import com.toilamanh.toilamanh.service.interfac.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponse> login (@Valid @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUserName();
        String password = loginRequest.getPassword();
        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            LoginResponse loginResponse =
                    LoginResponse.builder()
                            .message("userName/request is required")
                            .status(HttpStatus.BAD_REQUEST.value())
                            .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResponse);
        }
        LoginResponse loginResponse = authService.login(loginRequest);
        return ResponseEntity.status(loginResponse.getStatus()).body(loginResponse);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<RegisterResponse> register (@RequestBody RegisterRequest registerRequest) {
        RegisterResponse response;
        String email = registerRequest.getEmail();
        String username = registerRequest.getUsername();
        String password = registerRequest.getPassword();
        String confirmPassword = registerRequest.getConfirmPassword();
        if (email == null || username == null || password == null || confirmPassword == null || email.isEmpty() || username.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            RegisterResponse registerResponse =
                    RegisterResponse
                            .builder()
                            .message("(userName/email/password/confirmPassword) is required")
                            .status(HttpStatus.BAD_REQUEST.value()).build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerResponse);
        }
        if (!password.equals(confirmPassword)) {
            RegisterResponse registerResponse =
                    RegisterResponse
                            .builder()
                            .message("passwords do not match")
                            .status(HttpStatus.BAD_REQUEST.value()).build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerResponse);
        }

        response = authService.register(registerRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @PostMapping(value = "/info")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<RegisterResponse> myInfo (@RequestBody InfoRequest infoRequest) {
        if (!infoRequest.getToken().isBlank()) {
            RegisterResponse response = authService.myinfo(infoRequest);
            return ResponseEntity.status(response.getStatus()).body(response);
        }else {
            RegisterResponse response = RegisterResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("token is required")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}

