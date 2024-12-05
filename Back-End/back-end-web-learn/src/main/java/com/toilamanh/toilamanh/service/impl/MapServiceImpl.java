package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.request.MapRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.CourseResponse;
import com.toilamanh.toilamanh.dto.response.MapResponse;
import com.toilamanh.toilamanh.entity.Course;
import com.toilamanh.toilamanh.entity.Map;
import com.toilamanh.toilamanh.exception.custom.ExitsException;
import com.toilamanh.toilamanh.exception.custom.UserAciveNotFound;
import com.toilamanh.toilamanh.repository.MapRepository;
import com.toilamanh.toilamanh.service.interfac.MapService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MapServiceImpl implements MapService {
    MapRepository mapRepository;
    ModelMapper modelMapper;
    CourseServiceImpl courseService;

    @Override
    public ApiResponse getAllMaps() {
        try {
            List<MapResponse> MapList = new ArrayList<>();
            List<Map> listMapEntities = mapRepository.findAllByActive(1);
            for (Map map : listMapEntities) {
                MapResponse MapResponse = new MapResponse();
                MapResponse.setId(map.getId());
                MapResponse.setName(map.getName());
                MapResponse.setDescription(map.getDescription());
                List<CourseResponse> courseList = new ArrayList<>();
                for (Course course : map.getCourseList()) {
                    CourseResponse courseResponse = courseService.mapCourseToCourseResponse(course, null, 0, 0);
                    courseList.add(courseResponse);
                }
                MapResponse.setCourses(courseList);
                MapList.add(MapResponse);
            }

            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin map thành công")
                    .result(MapList)
                    .build();
        }catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse getMapData() {
       try {
            List<Map> maps = mapRepository.findAllByActive(1);
            List<MapResponse> mapResponses = new ArrayList<>();
            for (Map map : maps) {
                MapResponse mapResponse = new MapResponse();
                mapResponse.setId(map.getId());
                mapResponse.setName(map.getName());
                mapResponse.setDescription(map.getDescription());
                mapResponses.add(mapResponse);
            }
          return ApiResponse.builder()
                  .status(HttpStatus.OK.value())
                  .message("Lấy dữ liệu map thành công")
                  .result(mapResponses)
                  .build();
       }catch (Exception ex) {
           throw ex;
       }
    }

    @Override
    public ApiResponse getMapById(Long id) {
      try {
        MapResponse mapResponse = new MapResponse();
          Map optionalMap = mapRepository.findByIdAndActive(id, 1).orElseThrow(() -> new UserAciveNotFound("Không tìm thấy lộ trình tương ứng"));
          mapResponse.setId(optionalMap.getId());
          mapResponse.setName(optionalMap.getName());
          mapResponse.setDescription(optionalMap.getDescription());
          List<CourseResponse> courseList = new ArrayList<>();
          for (Course course : optionalMap.getCourseList()) {
              CourseResponse courseResponse = courseService.mapCourseToCourseResponse(course, null, 0, 0);
              courseList.add(courseResponse);
          }
          mapResponse.setCourses(courseList);

          return ApiResponse.builder()
                  .status(HttpStatus.OK.value())
                  .message("Lấy thông tin lộ trình thành công")
                  .result(mapResponse)
                  .build();
      }catch (UserAciveNotFound ex) {
        throw ex;
      }
      catch (Exception ex) {
          throw ex;
      }
    }

    @Override
    public ApiResponse addMap(MapRequest mapRequest) {
        try {
            String name = mapRequest.getName();
            String description = mapRequest.getDescription();

            Optional<Map> mapItem_1 = mapRepository.findByNameAndActive(name, 1);
            Optional<Map> mapItem_0 = mapRepository.findByNameAndActive(name, 0);
            if (mapItem_1.isPresent()) {
                throw new ExitsException("Đã tồn tại tên lộ trình này rồi");
            }
            Integer maxOrder = mapRepository.findMaxOrder();
            if (mapItem_0.isPresent()) {
                mapItem_0.get().setActive(1);
                mapItem_0.get().setOrderNumber(maxOrder > 0 ? maxOrder + 10 : maxOrder);
                mapRepository.save(mapItem_0.get());
            }else {
                Map newMap = new Map();
                newMap.setName(name);
                newMap.setOrderNumber(maxOrder > 0 ? maxOrder + 10 : maxOrder);
                newMap.setDescription(description);
                newMap.setActive(1);
                mapRepository.save(newMap);
            }
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Thêm lộ trình thành công")
                    .build();
        }catch (ExitsException ExitsException) {
            throw ExitsException;
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse updateMapById(Long id, MapRequest mapRequest) {
        try {
            Map mapUpdate = mapRepository.findByIdAndActive(id, 1).orElseThrow(() -> new UserAciveNotFound("Không tìm thấy lộ trình tương ứng"));
            modelMapper.map(mapRequest, mapUpdate);
            mapRepository.save(mapUpdate);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Cập nhật lộ trình học thành công")
                    .build();
        }
        catch (UserAciveNotFound ex) {
            throw ex;
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public ApiResponse deleteMapById(Long id) {
        try {
            Map map = mapRepository.findByIdAndActive(id, 1).orElseThrow(() -> new UserAciveNotFound("Không tìm thấy lộ trình tương ứng"));
            map.setActive(0);
            mapRepository.save(map);
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Xóa lộ trình học thành công")
                    .build();
        }catch (UserAciveNotFound ex) {
            throw ex;
        }
        catch (Exception ex) {
            throw ex;
        }
    }
}
