package com.toilamanh.toilamanh.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.toilamanh.toilamanh.dto.group.GroupCreateUser;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {
    @NotNull(message = "UserName không được để null", groups = {GroupCreateUser.class})
    @NotEmpty(message = "UserName không được để rỗng", groups = {GroupCreateUser.class})
    @Size(min = 4, max = 255)
    private String userName;
    @NotNull(message = "password không thể được null", groups = {GroupCreateUser.class})
    @NotEmpty(message = "password không thể rỗng", groups = {GroupCreateUser.class})
    @Size(min = 6, max = 255, message = "password phải tối thiểu từ 6 kí tự.")
    private String password;
    private String gender;
    @NotNull(message = "Email không được để null", groups = {GroupCreateUser.class})
    @NotEmpty(message = "email không được để rỗng ", groups = {GroupCreateUser.class})
    private String email;
    private Double point;
    private String phonenumber;
    private String avatar;
    private String description;
    private String cover_photo;
    private String role;
    private Integer active;
}
