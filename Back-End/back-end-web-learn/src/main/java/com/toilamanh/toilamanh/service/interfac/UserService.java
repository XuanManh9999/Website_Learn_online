package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.entity.User;

import java.util.List;

public interface UserService {
    ApiResponse deleteUser(Long id);
    ApiResponse userRegisterCourse(Long IdUser, Long IdCourse);
    ApiResponse userDoneWatchVideo(Long IdUser, Long IdCourse);
}
