package com.toilamanh.toilamanh.exception.custom;

public class TokenExpiredException extends RuntimeException{
    public TokenExpiredException(String message) {
        super(message);
    }
}
