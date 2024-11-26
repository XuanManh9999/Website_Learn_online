package com.toilamanh.toilamanh.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserRegisterCourseRequest {
    private Long IdUser;
    private Long IdCourse;
}
