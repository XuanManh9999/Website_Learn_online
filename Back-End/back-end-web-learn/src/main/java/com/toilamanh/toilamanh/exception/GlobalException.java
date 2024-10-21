package com.toilamanh.toilamanh.exception;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.exception.custom.CustomException;
import com.toilamanh.toilamanh.exception.custom.OurException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = OurException.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(OurException exception){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = CustomException.class)
    ResponseEntity<ApiResponse> handlingException(CustomException exception){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.internalServerError().body(apiResponse);
    }
}