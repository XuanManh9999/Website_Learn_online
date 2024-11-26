package com.toilamanh.toilamanh.service.interfac;
import com.toilamanh.toilamanh.dto.request.UserRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.ResponseUsers;

public interface UserService {
    ApiResponse deleteUser(Long id);
    ApiResponse userRegisterCourse(Long IdUser, Long IdCourse);
    ApiResponse userDoneWatchVideo(Long IdUser, Long IdCourse);
    ApiResponse getAllUsers (Integer page, Integer limit);
    ApiResponse createUser(UserRequest userRequest);
    ApiResponse updateUser(UserRequest userRequest, Long idUser);
    ApiResponse getUserById(Long id);
    ApiResponse checkUserRegisterCourse(Long IdUser, Long IdCourse);
}
