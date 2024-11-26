package com.toilamanh.toilamanh.service.impl;
import com.toilamanh.toilamanh.dto.request.ChapterRequest;
import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.dto.request.VideoRequest;
import com.toilamanh.toilamanh.dto.response.*;
import com.toilamanh.toilamanh.dto.youtube.YouTubeResponse;
import com.toilamanh.toilamanh.entity.*;
import com.toilamanh.toilamanh.exception.custom.BadException;
import com.toilamanh.toilamanh.exception.custom.OurException;
import com.toilamanh.toilamanh.repository.*;
import com.toilamanh.toilamanh.service.interfac.CourseService;
import com.toilamanh.toilamanh.service.interfac.YouTubeService;
import com.toilamanh.toilamanh.utils.UtilsFunc;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseServiceImpl implements CourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);
    Environment environment;
    ModelMapper modelMapper;
    CourseRepository courseRepository;
    CourseTypeRepository courseTypeRepository;
    UserWatchVideoRepository userWatchVideoRepository;
    UserRegisterCourseRepository userRegisterCourseRepository;
    YouTubeService youTubeService;
    ChapterRepository chapterRepository;
    private final VideoRepository videoRepository;

    @Override
    public ApiResponse addCourse(CourseRequest courseRequest) {
        try {
            Integer step_order =  Integer.parseInt(environment.getProperty("order_step"));
            Integer max_order_course = courseRepository.findMaxOrderNumber() == null ? 0 : courseRepository.findMaxOrderNumber() + step_order;
            Integer order_number = 0;
            Integer order_number_chapter = 0;
            Course course = new Course();
            modelMapper.map(courseRequest, course);
            // find chapterid
            Optional<CourseType> courseType = courseTypeRepository.findById(courseRequest.getCourseTypeID());
            if (courseType.isPresent()) {
                course.setCourseType(courseType.get());
            }
            course.setActive(1);
            course.setOrderNumber(max_order_course);
            List<Chapter> chapters = new ArrayList<>();
            for (ChapterRequest chapterRequest : courseRequest.getChapterList()) {
                Chapter chapter = new Chapter();
                modelMapper.map(chapterRequest, chapter);
                chapter.setCourse(course);
                chapter.setActive(1);
                chapter.setOrderNumber(order_number_chapter);
                List<Video> videoList = new ArrayList<>();
                for (VideoRequest videoRequest : chapterRequest.getVideos()) {
                    Video video = new Video();
                    modelMapper.map(videoRequest, video);
                    // lay du lieu tu video youtube
                    YouTubeResponse youTubeResponse = youTubeService.getVideoDetails(video.getUrlVideo());
                    for (var item : youTubeResponse.getItems()) {
                        video.setTitle(item.getSnippet().getTitle());
                        video.setDescription(item.getSnippet().getDescription());
                        Long duration = UtilsFunc.convertDurationToSeconds(item.getContentDetails().getDuration());
                        String durationText = UtilsFunc.convertIsoToDurationText(item.getContentDetails().getDuration());
                        video.setDuration(duration);
                        video.setDurationText(durationText);
                    }

                    video.setUrlVideo(videoRequest.getUrlVideo());
                    video.setOrderNumber(order_number);
                    video.setActive(1);
                    // Liên kết chapter với video nếu cần
                    video.setChapter(chapter);
                    videoList.add(video);
                    order_number += step_order;
                }
                chapter.setVideos(videoList);
                chapters.add(chapter);
                order_number_chapter += step_order;
            }

            // Thêm danh sách chapter vào course
            course.setChapterList(chapters);

            // Lưu course cùng với các chapter và video nếu có cascade
            courseRepository.save(course);

            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("CreateCourseDone")
                    .build();
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse getAllCourses(Long IdUser) {
        List<Course> courses = courseRepository.findAll().stream()
                .filter(course -> course.getActive() == 1)
                .sorted(Comparator.comparing(Course::getOrderNumber)) // Sắp xếp khóa học theo `order_number`
                .collect(Collectors.toList());

        List<CourseResponse> courseResponses = courses.stream()
                .map(course -> mapCourseToCourseResponse(course, IdUser, 1, 0))
                .collect(Collectors.toList());

        return ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .result(courseResponses)
                .message("Get courses Done")
                .build();
    }

    @Override
    public ApiResponse getCourseById(Long Id) {
        try {
            Course course = courseRepository.findById(Id).orElseThrow(() -> new OurException("Không tìm thấy khóa học tương ứng, vui lòng kiểm tra lại"));
            CourseResponse courseResponse = mapCourseToCourseResponse(course, null, 1, 1);

            return  ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin khóa học thành công")
                    .result(courseResponse)
                    .build();
        }catch (OurException e) {
            throw e;
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse getCourseByIdUserAndIdCourse(Long IdUser, Long IdCourse) {
        try {
            Course course = courseRepository.findById(IdCourse).orElseThrow(() -> new OurException("Không tìm thấy khóa học tương ứng, vui lòng kiểm tra lại"));
            CourseResponse courseResponse = mapCourseToCourseResponse(course, IdUser, 1, 1);
            return  ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin khóa học thành công")
                    .result(courseResponse)
                    .build();
        }catch (OurException e) {
            throw e;
        }
        catch (BadException e) {
            throw e;
        }
        catch (Exception ex) {
            throw ex;
        }
    }


    public CourseResponse mapCourseToCourseResponse(Course course, Long IdUser, Integer isShowChapter,Integer isShowVideo) {
        CourseResponse courseResponse = new CourseResponse();
        modelMapper.map(course, courseResponse);

        if (IdUser != null) {
            Boolean isRegister = hasUserRegisterCourse(IdUser, course.getId(), 1);
            courseResponse.setIsUserRegister(isRegister ? 1 : 0);
            Integer totalUserWatchVideo = userWatchVideoRepository.countUserWatchedVideos(course.getId(), IdUser);
            courseResponse.setTotalUserWatchVideo(totalUserWatchVideo);
        }

        Integer studentsCount = userRegisterCourseRepository.countByCourseId(course.getId());
        Integer totalVideoCourse = chapterRepository.countTotalVideosByCourseId(course.getId());
        Long duration = chapterRepository.getTotalDurationByCourseId(course.getId());
        String durationText = UtilsFunc.convertToDurationText(duration);


        courseResponse.setDurationText(durationText);
        courseResponse.setStudentsCount(studentsCount);
        courseResponse.setVideosCount(totalVideoCourse);
        courseResponse.setDuration(duration);

        // Kiểm tra nếu isShowChapter = 1 thì mới lấy danh sách chương và sắp xếp
        if (isShowChapter != null && isShowChapter == 1) {
            List<ChapterDTO> chapterDTOs = course.getChapterList().stream()
                    .filter(chapter -> chapter.getActive() == 1)
                    .sorted(Comparator.comparing(Chapter::getOrderNumber)) // Sắp xếp các Chapter theo thứ tự `order`
                    .map(chapter -> mapChapterToChapterDTO(chapter, IdUser, isShowVideo))
                    .collect(Collectors.toList());
            courseResponse.setChapterList(chapterDTOs);
        } else {
            courseResponse.setChapterList(null);
        }

        return courseResponse;
    }
    private ChapterDTO mapChapterToChapterDTO(Chapter chapter, Long IdUser, Integer isShowVideo) {
        ChapterDTO chapterDTO = new ChapterDTO();
        modelMapper.map(chapter, chapterDTO);
        if (isShowVideo == 1) {
            chapterDTO.setTotal_videos(chapter.getVideos().size());
            chapterDTO.setTotal_video_user_watch(userWatchVideoRepository.countUserWatchedVideos(IdUser, chapter.getId()));
            Long duration = videoRepository.sumTotalDurationByChapter(chapter.getId());
            String total_time_video = UtilsFunc.convertSecondsToMinutesSeconds(duration);
            Integer total_user_watch_video_chapter = chapterRepository.countWatchedVideosByChapterIdAndUserId(chapter.getId(), IdUser);
            chapterDTO.setTotal_video_user_watch(total_user_watch_video_chapter);
            chapterDTO.setTotal_time_video(total_time_video);

            // Sắp xếp danh sách Video theo thứ tự `order` trước khi chuyển đổi
            List<VideoDTO> videoDTOs = chapter.getVideos().stream()
                    .sorted(Comparator.comparing(Video::getOrderNumber)) // Sắp xếp các Video theo thứ tự `order`
                    .map(video -> mapVideoToVideoDTO(video, IdUser))
                    .collect(Collectors.toList());

            chapterDTO.setVideos(videoDTOs);
        }else {
            chapterDTO.setVideos(null);
        }

        return chapterDTO;
    }

    private VideoDTO mapVideoToVideoDTO(Video video, Long IdUser) {
        VideoDTO videoDTO = new VideoDTO();
        modelMapper.map(video, videoDTO);
        if (IdUser != null) {
            Boolean isWatch = hasUserWatchedVideo(IdUser, video.getId());
            videoDTO.setIsUserWatchVideo(isWatch ? 1 : 0);
        }
        return videoDTO;
    }

    public boolean hasUserWatchedVideo(Long userId, Long videoId) {
        return userWatchVideoRepository.existsByUserIdAndVideoId(userId, videoId);
    }
    public boolean hasUserRegisterCourse(Long userId, Long courseId, Integer active) {
       return userRegisterCourseRepository.existsByUserIdAndCourseIdAndActive(userId, courseId, active);
    }
}
