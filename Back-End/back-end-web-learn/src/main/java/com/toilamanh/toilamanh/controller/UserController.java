package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.entity.User;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping(value = "/api/v1")
public class UserController {
    UserService userService;
    @GetMapping(value = "/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
