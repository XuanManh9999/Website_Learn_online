package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.request.InfoRequest;
import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.dto.response.UserDTO;
import com.toilamanh.toilamanh.entity.User;
import com.toilamanh.toilamanh.exception.custom.CustomException;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.repository.UserRepository;
import com.toilamanh.toilamanh.service.interfac.AuthService;
import com.toilamanh.toilamanh.utils.JWTUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthServiceImpl implements AuthService {
    UserRepository userRepository;
    ObjectFactory<PasswordEncoder> objectFactory;
    ObjectFactory<ModelMapper> mapperObjectFactory;
    ObjectFactory<JWTUtils> jwtUtilsObjectFactory;
    ObjectFactory<AuthenticationManager> authenticationManagerObjectFactory;
    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        try {
            Optional<User> user = userRepository.findByUserName(registerRequest.getUsername());
            if (user.isPresent()) {
                throw new OurException("Username already exist");
            }
            User newUser = new User();
            newUser.setEmail(registerRequest.getEmail());
            newUser.setUserName(registerRequest.getUsername());
            newUser.setPassword(objectFactory.getObject().encode(registerRequest.getPassword()));
            User saveUser = userRepository.save(newUser);
            UserDTO userDTO = mapperObjectFactory.getObject().map(saveUser, UserDTO.class);
            return RegisterResponse.builder()
                    .status(HttpStatus.CREATED.value())
                    .message("Create User Success")
                    .userDTO(userDTO).build();

        }catch (OurException e) {
            throw e;
        }catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            var user = userRepository.findByUserName(loginRequest.getUserName()).orElseThrow(() -> new OurException("User name: " + loginRequest.getUserName() + " Not Found"));
            authenticationManagerObjectFactory.getObject()
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));

            var token = jwtUtilsObjectFactory.getObject().generateToken(user);

            return LoginResponse.builder()
                    .token(token)
                    .status(HttpStatus.OK.value())
                    .expirationTime("7 Days")
                    .message("Login Success")
                    .build();

        }catch (OurException e) {
          throw e;
        }catch (Exception e) {
            throw new CustomException("Error Occurred During User Login: " + e.getMessage());
        }
    }

    @Override
    public RegisterResponse myinfo(InfoRequest infoRequest) {
        try {
            String userName = jwtUtilsObjectFactory.getObject().extractUsername(infoRequest.getToken());
            User user = userRepository.findByUserName(userName).orElseThrow(() -> new OurException("userName is not found") );
            UserDTO userDTO = mapperObjectFactory.getObject().map(user, UserDTO.class);
            return RegisterResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("My Info Success")
                    .userDTO(userDTO).build();
        }catch (OurException e) {
            throw e;
        }catch (Exception e) {
            throw new CustomException("token is invalid: " + e.getMessage());
        }
    }
}

