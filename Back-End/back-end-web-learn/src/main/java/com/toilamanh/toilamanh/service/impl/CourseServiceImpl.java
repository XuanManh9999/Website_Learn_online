package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.request.ChapterRequest;
import com.toilamanh.toilamanh.dto.request.CourseRequest;
import com.toilamanh.toilamanh.dto.request.VideoRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.entity.Chapter;
import com.toilamanh.toilamanh.entity.Course;
import com.toilamanh.toilamanh.entity.Video;
import com.toilamanh.toilamanh.repository.CourseRepository;
import com.toilamanh.toilamanh.service.interfac.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseServiceImpl implements CourseService {
    ModelMapper modelMapper;
    CourseRepository courseRepository;
    @Override
    public ApiResponse addCourse(CourseRequest courseRequest) {
        try {
            Integer order_number = 0;
            Integer order_number_chapter = 0;
            Course course = new Course();
            modelMapper.map(courseRequest, course);
            course.setActive(1);
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
                    video.setUrlVideo(videoRequest.getUrlVideo());
                    video.setOrderNumber(order_number);
                    video.setActive(1);

                    // Liên kết chapter với video nếu cần
                    video.setChapter(chapter);
                    videoList.add(video);
                    order_number += 10;

                }
                chapter.setVideos(videoList);
                chapters.add(chapter);
                order_number_chapter += 10;
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

}
