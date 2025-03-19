package com.lootopia.server.controller;

import com.lootopia.server.dto.HuntDto;
import com.lootopia.server.service.HuntService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hunts")
public class HuntController {

    private final HuntService huntService;

    public HuntController(HuntService huntService) {
        this.huntService = huntService;
    }

    @GetMapping("/popularity")
    public ResponseEntity<List<HuntDto>> findAllByPopularity() {
        return ResponseEntity.ok(huntService.findAllByPopularity());
    }

}
