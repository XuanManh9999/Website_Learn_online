package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.request.UserRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.ResponseUsers;
import com.toilamanh.toilamanh.dto.response.UserDTO;
import com.toilamanh.toilamanh.entity.*;
import com.toilamanh.toilamanh.exception.custom.*;
import com.toilamanh.toilamanh.repository.*;
import com.toilamanh.toilamanh.service.interfac.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    ModelMapper modelMapper;
    UserRepository userRepository;
    UserRegisterCourseRepository userRegisterCourseRepository;
    CourseRepository courseRepository;
    VideoRepository videoRepository;
    UserWatchVideoRepository userWatchVideoRepository;
    ObjectFactory<PasswordEncoder> passwordEncoderFactory;
    ObjectFactory<CourseServiceImpl> courseServiceObjectFactory;

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

    @Override
    public ApiResponse getAllUsers(Integer page, Integer limit) {
        try {
            // Kiểm tra nếu page hoặc limit không hợp lệ
            if (page == null || page < 1) page = 1;
            if (limit == null || limit < 1) limit = 10;

            Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.ASC, "id"));

            Page<User> users = userRepository.findAll(pageable);

            Long count_user_not_active = userRepository.countAllByActive(0);

            Integer total_register_course_system = userRegisterCourseRepository.countDistinctUsers();
            List<UserDTO> userDTOS = users.getContent().stream()
                    .map(user -> {
                        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
                        userDTO.setActive(user.getActive());
                        userDTO.setCreated_at(user.getCreatedAt());
                        userDTO.setUpdated_at(user.getUpdatedAt());
                        return userDTO;
                    })
                    .collect(Collectors.toList());
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Get all user done")
                    .result(ResponseUsers.builder()
                            .users(userDTOS)
                            .total_user(users.getTotalElements())
                            .total_register_course(total_register_course_system)
                            .total_unregister_course(users.getTotalElements() - total_register_course_system)
                            .total_user_disable(count_user_not_active)
                            .build()).build();
        }catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse createUser(UserRequest userRequest) {
        try {
            // check ton tai userName do chua
            // check ton tai email do chua
            Optional<User> isExitsUserName_0 = userRepository.findByUserNameAndActive(userRequest.getUserName(), 0);
            if (isExitsUserName_0.isPresent()) {
                throw new ExitsException("Đã có tài khoản này trong hệ thống, nhưng tài khoản đang bị vô hiệu hóa");
            }
            Optional<User> isExitsUserName_1 = userRepository.findByUserNameAndActive(userRequest.getUserName(), 1);
            if (isExitsUserName_1.isPresent()) {
                throw new ExitsException("Tên người dùng đã tồn tại, vui lòng chọn tên người dùng khác");
            }
            Optional<User> isExitsEmail_0 = userRepository.findByEmailAndActive(userRequest.getEmail(), 0);
            if (isExitsEmail_0.isPresent()) {
                throw new ExitsException("Đã có email này trong hệ thống, nhưng tài khoản đang bị vô hiệu hóa");
            }
            Optional<User> isExitsEmail_1 = userRepository.findByEmailAndActive(userRequest.getEmail(), 1);
            if (isExitsEmail_1.isPresent()) {
                throw new ExitsException("Email đã tồn tại, vui lòng chọn tên người dùng khác");
            }

            User user = modelMapper.map(userRequest, User.class);
            String rawPassword = passwordEncoderFactory.getObject().encode(userRequest.getPassword());
            user.setPassword(rawPassword);
            user.setActive(1);
            userRepository.save(user);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Tạo mới người dùng thành công")
                    .build();
        }catch (ExitsException ex) {
            throw ex;
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse updateUser(UserRequest userRequest, Long idUser) {
        try {
            // Lấy thông tin người dùng hiện tại
            User existingUser = userRepository.findById(idUser)
                    .orElseThrow(() -> new UserAciveNotFound("Không tìm thấy người dùng tương ứng"));

            // Dùng ModelMapper để ánh xạ các trường
            modelMapper.map(userRequest, existingUser);

            // Nếu password được cung cấp, mã hóa lại
            if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
                String encodedPassword = passwordEncoderFactory.getObject().encode(userRequest.getPassword());
                existingUser.setPassword(encodedPassword);
            }

            // Lưu lại người dùng sau khi update
            userRepository.save(existingUser);

            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Cập nhật người dùng thành công")
                    .build();
        } catch (UserAciveNotFound ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex; // Xử lý ngoại lệ nếu cần
        }
    }

    @Override
    public ApiResponse getUserById(Long id) {
        try {
            Optional<User> user_0 = userRepository.findByIdAndActive(id, 0);
            if (user_0.isPresent()) {
                throw new UserNotActive("Người dùng đang bị vô hiệu hóa, vui lòng kểm tra lại");
            }
            User user_1 = userRepository.findByIdAndActive(id, 1).orElseThrow(() -> new UserAciveNotFound("Không tìm thấy người dùng trong hệ thống"));
            UserDTO userDTO = modelMapper.map(user_1, UserDTO.class);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin người dùng thành công")
                    .result(userDTO)
                    .build();
        }catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse checkUserRegisterCourse(Long IdUser, Long IdCourse) {
        try {
            Boolean isRegister =  courseServiceObjectFactory.getObject().hasUserRegisterCourse(IdUser, IdCourse, 1);
            if (isRegister) {
                return ApiResponse.builder()
                        .status(HttpStatus.OK.value())
                        .message("User is registerCourse")
                        .build();
            }else {
                return ApiResponse.builder()
                        .status(HttpStatus.NOT_FOUND.value())
                        .message("User is not registerCourse")
                        .build();
            }
        }catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse searchUserByUserName(String userName) {
        try {
            List<User> users = userRepository.searchUsersByUserName(userName);
            List<UserDTO> userDTOS = new ArrayList<>();
            for (User user : users) {
                UserDTO userDTO =  modelMapper.map(user, UserDTO.class);
                userDTOS.add(userDTO);
            }
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Search thông tin người dùng thành công")
                    .result(userDTOS)
                    .build();
        }catch (Exception ex) {
            throw ex;
        }
    }
}
