package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.entity.User;
import com.toilamanh.toilamanh.exception.custom.ServerException;
import com.toilamanh.toilamanh.exception.custom.UserAciveNotFound;
import com.toilamanh.toilamanh.repository.UserRepository;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    @Override
    public ApiResponse deleteUser(Long id) {
        try {
            User user = userRepository.findByIdAndActive(id, 1).orElseThrow(() -> new UserAciveNotFound("Người dùng không tồn tại trong hệ thống, vui lòng kiểm tra lại."));
            user.setActive(0);
            userRepository.save(user);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Xóa người dùng thành công")
                    .build();
        }catch (UserAciveNotFound e) {
            throw e;
        }catch (Exception e) {
            throw new ServerException("Đã xảy ra lỗi xóa người dùng từ phía server " + e.getMessage());
        }
    }


}
