package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private String userName;

    private String gender;

    private String email;

    private Double point = 0D;

    private String facebook;

    private String google;

    private String phonenumber;

    private String avatar;

    private String description;

    private String cover_photo;

    private String role = "USER";

//    private List<Blog> blogList;
//
//    private List<UserRegisterCourse> commentList;
}
