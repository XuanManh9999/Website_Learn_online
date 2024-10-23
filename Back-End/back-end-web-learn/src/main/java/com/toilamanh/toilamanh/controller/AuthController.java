package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.*;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.service.interfac.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping(value = "/verify-otp-register")
    public ResponseEntity<ApiResponse> verifyOtpRegister(@RequestBody OtpRequest otpRequest) {

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
            authService.updateStatusUser(email, otp);
            return ResponseEntity.status(HttpStatus.OK.value()).body(
                    ApiResponse.builder()
                            .status(HttpStatus.OK.value())
                            .message("Register User Done")
                            .build()
            );
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( ApiResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("OTP is Expired")
                    .build());
        }
    }


    @PostMapping(value = "/verify-otp-forgot-password")
    public ResponseEntity<ApiResponse> verifyOtpForgotPassword(@RequestBody OtpRequest otpRequest) {

        String email = otpRequest.getEmail();
        String otp = otpRequest.getOtp();
        if (email == null || otp == null || otp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( ApiResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("email/otp is required")
                    .build());
        }
        boolean isValid = authService.isValidOTP(email, otp);
        if (isValid) {
            authService.sendPasswordUser(email, otp);
            return ResponseEntity.status(HttpStatus.OK.value()).body(
                    ApiResponse.builder()
                            .status(HttpStatus.OK.value())
                            .message("Change Password Done")
                            .build()
            );
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( ApiResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("OTP is Expired")
                    .build());
        }
    }

    @PostMapping(value = "/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody ForgotPasswordRequest passwordRequest) {
        String email = passwordRequest.getEmail();
        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value())
                    .body(
                            ApiResponse.builder()
                                    .status(HttpStatus.BAD_REQUEST.value())
                                    .message("email is required")
                                    .build()
                    );
        }
        authService.forgotPassword(email);
        return ResponseEntity.status(HttpStatus.OK.value())
                .body(
                        ApiResponse.builder()
                                .message("Active forgot-password check done")
                                .status(HttpStatus.OK.value())
                                .build()
                );
    }

//    Login gooole
    @GetMapping(value = "/signingoole")
    public String currentUser (OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof OAuth2AuthenticationToken) {
             oAuth2AuthenticationToken.getPrincipal().getName();
        } else {
            // Người dùng chưa đăng nhập bằng OAuth2
            return "No authenticated user found";
        }
        return null;
    }


    // change password
    @PostMapping(value = "/change-password")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ApiResponse> handleChangePassword (HttpServletRequest request, @RequestBody ChangePasswordRequest changePasswordRequest) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ") || changePasswordRequest != null) {
            String token = authorizationHeader.substring(7); // Lấy token từ header
            ApiResponse apiResponse = authService.handleChangePassword(changePasswordRequest, token);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value())
                    .body(ApiResponse.builder()
                            .message("Token/password is required")
                            .status(HttpStatus.BAD_REQUEST.value())
                            .build()
                    );

        }
    }
}

