package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.group.GroupCreateUser;
import com.toilamanh.toilamanh.dto.group.GroupUpdateUser;
import com.toilamanh.toilamanh.dto.request.DispatchUserWatchVideoRequest;
import com.toilamanh.toilamanh.dto.request.UserRegisterCourseRequest;
import com.toilamanh.toilamanh.dto.request.UserRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
    UserService userService;
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(value = "page") Integer page,
            @RequestParam("limit") Integer limit
    ) {
        return ResponseEntity.ok(userService.getAllUsers(page, limit));
    }
    @PreAuthorize("hasAuthority('ADMIN or USER')")
    @GetMapping("/{idUser}")
    public ResponseEntity<?> getUserById(@PathVariable Long idUser) {
        if (idUser == null) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("ID user is required")
                            .build()
            );
        }
        return ResponseEntity.ok().body(userService.getUserById(idUser));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
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

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @PostMapping("/register-course")
    public ResponseEntity<?> registerCourseByIdUserAndIdCourse(@RequestBody Map<String, Long> body) {
        Long idUser  = body.get("IdUser");
        Long idCourse = body.get("IdCourse");
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

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
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

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createUser(@Validated({GroupCreateUser.class}) @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok().body(userService.createUser(userRequest));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{idUser}")
    public ResponseEntity<?> updateUser(
            @Validated({GroupUpdateUser.class})  @RequestBody UserRequest userRequest, @Validated({GroupUpdateUser.class}) @PathVariable(name = "idUser") Long id) {
        return ResponseEntity.ok().body(userService.updateUser(userRequest, id));
    }


    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @PostMapping("/check-register-course")
    public ResponseEntity<?> checkRegisterCourse(@RequestBody Map<String, Long> body) {
        Long IdUser = body.get("IdUser");
        Long IdCourse = body.get("IdCourse");
        if (IdUser == null || IdCourse == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("IdUser/IdCourse is required");
        }
        return ResponseEntity.ok().body(userService.checkUserRegisterCourse(IdUser, IdCourse));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/search")
    public ResponseEntity<?> searchUserByUserName(@RequestParam(name = "userName") String name) {
        return ResponseEntity.ok().body(userService.searchUserByUserName(name));
    }




}
