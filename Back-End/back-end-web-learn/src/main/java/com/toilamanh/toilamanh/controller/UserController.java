package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping(value = "/api/v1/users")
public class UserController {
    UserService userService;

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
}
