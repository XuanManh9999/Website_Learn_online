package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.UserService;
import com.toilamanh.toilamanh.service.interfac.YouTubeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping(value = "/api/v1/users")
public class UserController {
    UserService userService;
    YouTubeService youTubeService;
    @DeleteMapping("/{IdUser}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable(required = false) Long IdUser) {
        if (IdUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .message("ID user is required")
                            .status(HttpStatus.BAD_REQUEST.value())
                            .build()
            );
        }
        ApiResponse response =  userService.deleteUser(IdUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(youTubeService.getVideoDetails("v3JuDg0rwZM"));
    }

}
