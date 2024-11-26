package com.toilamanh.toilamanh.controller;

import com.toilamanh.toilamanh.dto.request.MapRequest;
import com.toilamanh.toilamanh.service.interfac.MapService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/maps")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MapController {
    MapService mapService;
    @GetMapping
    public ResponseEntity<?> getMaps () {
        return ResponseEntity.ok().body(mapService.getAllMaps());
    }

    @GetMapping("/{IdMap}")
    public ResponseEntity<?> getMapById(@PathVariable(name = "IdMap", required = true) Long IdMap) {
        return ResponseEntity.ok().body(mapService.getMapById(IdMap));
    }
    @PostMapping
    public ResponseEntity<?> addMap(@RequestBody MapRequest mapRequest) {
        return ResponseEntity.ok().body(mapService.addMap(mapRequest));
    }


    @PutMapping("/{IdMap}")
    public ResponseEntity<?> updateMap(@RequestBody MapRequest mapRequest) {
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMap(@RequestBody MapRequest mapRequest) {
        return ResponseEntity.ok().body(null);
    }

}
