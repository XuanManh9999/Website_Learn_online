package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.entity.*;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.exception.custom.ServerException;
import com.toilamanh.toilamanh.exception.custom.UserAciveNotFound;
import com.toilamanh.toilamanh.repository.*;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserRegisterCourseRepository userRegisterCourseRepository;
    CourseRepository courseRepository;
    VideoRepository videoRepository;
    UserWatchVideoRepository userWatchVideoRepository;

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

    @Override
    public ApiResponse userRegisterCourse(Long IdUser, Long IdCourse) {
       try {
           User user = userRepository.findByIdAndActive(IdUser, 1).orElseThrow(() -> new OurException("Không tìm thấy người dùng, vui lòng kiểm tra lại"));
           Course course = courseRepository.findCourseByIdAndActive(IdCourse, 1).orElseThrow(() -> new OurException("Không tìm thấy khóa học tương ứng"));

           boolean isRegister = userRegisterCourseRepository.existsByUserIdAndCourseId(IdUser, IdCourse);

           if (isRegister) {
               return ApiResponse.builder()
                       .message("Bạn đã đăng ký khóa học này rồi")
                       .status(HttpStatus.CONFLICT.value())
                       .build();
           }else  {
               UserRegisterCourse userRegisterCourse =  new UserRegisterCourse();
               userRegisterCourse.setCourse(course);
               userRegisterCourse.setUser(user);
               userRegisterCourse.setActive(1);
               userRegisterCourseRepository.save(userRegisterCourse);
               return ApiResponse.builder()
                       .message("Đăng ký khóa học thành công")
                       .status(HttpStatus.OK.value())
                       .build();
           }
       }catch (OurException ex) {
           throw ex;
       }
       catch (Exception ex) {
           throw  ex;
       }
    }

    @Override
    public ApiResponse userDoneWatchVideo(Long IdUser, Long IdVideo) {
        try {
            // Tìm kiếm User và Video
            User user = userRepository.findByIdAndActive(IdUser, 1)
                    .orElseThrow(() -> new OurException("Không tìm thấy người dùng, vui lòng kiểm tra lại"));
            Video video = videoRepository.findVideoByIdAndActive(IdVideo, 1)
                    .orElseThrow(() -> new OurException("Không tìm thấy video, vui lòng kiểm tra lại"));

            boolean isWatchVideo = userWatchVideoRepository.existsByUserIdAndVideoId(IdUser,IdVideo);

            if (isWatchVideo) {
                return ApiResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("Người dùng đã học video nay rồi")
                        .build();
            }else {
                // Tạo và thiết lập UserWatchVideoId
                UserWatchVideoId userWatchVideoId = new UserWatchVideoId();

                // Tạo đối tượng UserWatchVideo và thiết lập giá trị
                UserWatchVideo userWatchVideo = new UserWatchVideo();
                userWatchVideo.setId(userWatchVideoId);
                userWatchVideo.setUser(user);
                userWatchVideo.setVideo(video);

                // Lưu vào cơ sở dữ liệu
                userWatchVideoRepository.save(userWatchVideo);

                return ApiResponse.builder()
                        .status(HttpStatus.OK.value())
                        .message("Thành công")
                        .build();
            }

        } catch (OurException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình lưu thông tin người dùng xem video", ex);
        }
    }


}
