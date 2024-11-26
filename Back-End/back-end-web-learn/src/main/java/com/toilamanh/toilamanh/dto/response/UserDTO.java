package com.toilamanh.toilamanh.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    @JsonProperty("user_name")
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
    private Integer active;
    @JsonProperty("createAt")
    private LocalDateTime created_at;
    @JsonProperty("updateAt")
    private LocalDateTime updated_at;
//    private List<Blog> blogList;
//
//    private List<UserRegisterCourse> commentList;
}
