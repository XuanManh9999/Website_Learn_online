package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.response.ApiResponse;
import com.toilamanh.toilamanh.dto.response.MapDTO;

public interface MapService {
    ApiResponse getAllMaps();
    ApiResponse getMapById(Long id);
    ApiResponse addMap(MapDTO mapDTO);
    ApiResponse updateMapById(Long id, MapDTO mapDTO);
    ApiResponse deleteMapById(Long id);
}
