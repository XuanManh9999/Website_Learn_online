package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.request.InfoRequest;
import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.dto.response.UserDTO;

public interface AuthService {
    RegisterResponse register(RegisterRequest registerRequest);
    LoginResponse login(LoginRequest loginRequest);
    RegisterResponse myinfo (InfoRequest infoRequest);
}
