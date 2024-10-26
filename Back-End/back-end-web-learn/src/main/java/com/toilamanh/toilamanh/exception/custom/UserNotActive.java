package com.toilamanh.toilamanh.exception.custom;

public class UserNotActive extends RuntimeException{
    public UserNotActive(String message) {
        super(message);
    }
}
