package com.toilamanh.toilamanh.service.interfac;

import com.toilamanh.toilamanh.dto.request.MapRequest;
import com.toilamanh.toilamanh.dto.response.ApiResponse;

public interface MapService {
    ApiResponse getAllMaps();
    ApiResponse getMapById(Long id);
    ApiResponse addMap(MapRequest mapRequest);
    ApiResponse updateMapById(Long id, MapRequest mapRequest);
    ApiResponse deleteMapById(Long id);
}
