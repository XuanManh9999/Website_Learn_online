package com.toilamanh.toilamanh.service.impl;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.MapDTO;
import com.toilamanh.toilamanh.entity.Map;
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

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MapServiceImpl implements MapService {
    MapRepository mapRepository;
    ModelMapper modelMapper;

    @Override
    public ApiResponse getAllMaps() {
        try {
            List<Map> maps = mapRepository.findAllMapByActive(1);
            List<MapDTO> mapDTOS = new ArrayList<>();
            for (Map map : maps) {
                MapDTO mapDTO = modelMapper.map(map, MapDTO.class);
                mapDTOS.add(mapDTO);
            }
            return ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Lấy thông tin lộ trình thành công")
                    .result(mapDTOS).
                    build();
        }catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ApiResponse getMapById(Long id) {
        return null;
    }

    @Override
    public ApiResponse addMap(MapDTO mapDTO) {
        return null;
    }

    @Override
    public ApiResponse updateMapById(Long id, MapDTO mapDTO) {
        return null;
    }

    @Override
    public ApiResponse deleteMapById(Long id) {
        return null;
    }
}
