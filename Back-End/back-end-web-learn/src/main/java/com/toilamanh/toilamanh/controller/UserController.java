package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.DispatchUserWatchVideoRequest;
import com.toilamanh.toilamanh.dto.request.UserRegisterCourseRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.UserService;
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
    @DeleteMapping("/{IdUser}")
    public ResponseEntity<?> deleteUser(@PathVariable(required = false) Long IdUser) {
        if (IdUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .message("ID user is required")
                            .status(HttpStatus.BAD_REQUEST.value())
                            .build()
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(IdUser));
    }

    @PostMapping("/register-course")
    public ResponseEntity<?> registerCourseByIdUserAndIdCourse(@RequestBody UserRegisterCourseRequest userRegisterCourseRequest) {
        Long idUser  = userRegisterCourseRequest.getIdUser();
        Long idCourse = userRegisterCourseRequest.getIdCourse();
        if (idUser == null || idCourse == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder().status(HttpStatus.BAD_REQUEST.value())
                            .message("IdUser/IdCourse là bắt buộc để tiếp tục")
                            .build()
            );
        }else {
            return ResponseEntity.ok().body(
                    userService.userRegisterCourse(idUser, idCourse)
            );
        }
    }

    @PostMapping("/dispatch-done-video")
    public ResponseEntity<?> userDispatchWatchVideo(@RequestBody DispatchUserWatchVideoRequest dispatchUserWatchVideoRequest) {
        Long idUser = dispatchUserWatchVideoRequest.getIdUser();
        Long idVideo = dispatchUserWatchVideoRequest.getIdVideo();
        if (idUser == null || idVideo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder().status(HttpStatus.BAD_REQUEST.value())
                            .message("IdUser/idVideo là bắt buộc để tiếp tục")
                            .build()
            );
        }else {
            return ResponseEntity.ok().body(
                    userService.userDoneWatchVideo(idUser, idVideo)
            );
        }
    }
}
