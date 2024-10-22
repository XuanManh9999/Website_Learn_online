package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.OtpRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.service.interfac.AuthService;
import com.toilamanh.toilamanh.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponse> login (@RequestBody LoginRequest loginRequest) {
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
        String otp_code = Utils.generateOTP();

        authService.sendOTPEmail(email, otp_code);
        authService.saveOTP(email, otp_code);

        response = authService.register(registerRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping(value = "/info")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<RegisterResponse> myInfo (HttpServletRequest request) {
        // Lấy token từ header Authorization
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Lấy token từ header
            RegisterResponse response = authService.myinfo(token); // Gọi service với token
            return ResponseEntity.status(response.getStatus()).body(response);
        } else {
            RegisterResponse response = RegisterResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Token is required")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @PostMapping(value = "/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtp(@RequestBody OtpRequest otpRequest) {

        String email = otpRequest.getEmail();
        String otp = otpRequest.getOtp();
        if (email == null || otp == null || otp.isEmpty()) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( ApiResponse.builder()
                   .status(HttpStatus.BAD_REQUEST.value())
                   .message("email/otp is required")
                   .build());
        }
        boolean isValid = authService.isValidOTP(otpRequest.getEmail(), otpRequest.getOtp());
        if (isValid) {
            ApiResponse response =  authService.UpdateStatusUser(email, otp);
            return ResponseEntity.status(response.getStatus()).body(response);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( ApiResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("otp is Expired")
                    .build());
        }
    }


}

