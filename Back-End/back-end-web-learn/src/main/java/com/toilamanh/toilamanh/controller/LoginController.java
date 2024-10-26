package com.toilamanh.toilamanh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class LoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/user")
    public Principal user(Principal user) {
        System.out.println("user: " + user.getName());
        return user;
    }
}
