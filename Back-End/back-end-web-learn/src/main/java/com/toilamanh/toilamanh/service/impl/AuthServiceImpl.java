package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.request.LoginRequest;
import com.toilamanh.toilamanh.dto.request.RegisterRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.LoginResponse;
import com.toilamanh.toilamanh.dto.response.RegisterResponse;
import com.toilamanh.toilamanh.dto.response.UserDTO;
import com.toilamanh.toilamanh.entity.Otp;
import com.toilamanh.toilamanh.entity.User;
import com.toilamanh.toilamanh.exception.custom.CustomException;
import com.toilamanh.toilamanh.exception.custom.OtpNotFound;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.exception.custom.UserAciveNotFound;
import com.toilamanh.toilamanh.repository.OtpRepository;
import com.toilamanh.toilamanh.repository.UserRepository;
import com.toilamanh.toilamanh.service.interfac.AuthService;
import com.toilamanh.toilamanh.utils.JWTUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    ObjectFactory<JavaMailSender> mailSenderFactory;
    ObjectFactory<OtpRepository> otpRepositoryObjectFactory;
    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        try {
            Optional<User> user = userRepository.findByUserNameAndActive(registerRequest.getUsername(), 1);
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
            var user = userRepository.findByUserNameAndActive(loginRequest.getUserName(), 1).orElseThrow(() -> new OurException("User name: " + loginRequest.getUserName() + " Not Found"));
            authenticationManagerObjectFactory.getObject()
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));

            var token = jwtUtilsObjectFactory.getObject().generateToken(user);

            return LoginResponse.builder()
                    .token(token)
                    .status(HttpStatus.OK.value())
                    .role(user.getRole())
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
    public RegisterResponse myinfo(String token) {
        try {
            String userName = jwtUtilsObjectFactory.getObject().extractUsername(token);
            User user = userRepository.findByUserNameAndActive(userName, 1).orElseThrow(() -> new OurException("userName is not found") );
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
    @Override
    public void sendOTPEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your OTP Code");
            message.setText("Your OTP code is: " + otp);
            mailSenderFactory.getObject().send(message);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse UpdateStatusUser(String email, String otp) {
        try {
            Otp otpEntity =  otpRepositoryObjectFactory.getObject().findByEmailAndOtpCode(email, otp).orElseThrow(() -> new OtpNotFound("Otp is not found"));
            User user = userRepository.findByEmailAndActive(otpEntity.getEmail(), 0).orElseThrow(() -> new UserAciveNotFound("User is not found"));
            user.setActive(1);
            userRepository.save(user);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("User is register done")
                    .build();
        }catch (OtpNotFound e) {
            throw e;
        }catch (UserAciveNotFound e) {
            throw e;
        }
    }

    @Override
    public void saveOTP(String email, String otp) {
        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setOtpCode(otp);
        otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(2)); // OTP có hiệu lực trong 2 phút
        otpRepositoryObjectFactory.getObject().save(otpEntity);
    }
    @Override
    public boolean isValidOTP(String email, String otp) {
        Optional<Otp> otpEntity = otpRepositoryObjectFactory.getObject().findByEmailAndOtpCode(email, otp);
        if (otpEntity.isPresent() && otpEntity.get().getExpiresAt().isAfter(LocalDateTime.now())) {
            return true;
        }
        return false;
    }
}

