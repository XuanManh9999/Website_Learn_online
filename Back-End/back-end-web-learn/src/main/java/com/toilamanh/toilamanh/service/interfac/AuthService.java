package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest registerRequest);
    LoginResponse login(LoginRequest loginRequest);
    RegisterResponse myinfo (String token);
    void saveOTP(String email, String otp);
    boolean isValidOTP(String email, String otp);
    void sendOTPEmail(String toEmail, String otp);
    void updateStatusUser(String email, String otp);
    void forgotPassword(String email);
    void sendNewPasswordWithEmail(String toEmail, String password);
    void sendPasswordUser(String email, String otp);

}
