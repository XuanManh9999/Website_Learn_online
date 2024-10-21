package com.toilamanh.toilamanh.exception.custom;

public class MissingHeaderException extends RuntimeException{
    public MissingHeaderException(String msg){
        super(msg);
    }
}
