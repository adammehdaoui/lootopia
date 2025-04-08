package com.lootopia.server.controller;

import com.lootopia.server.dto.HuntLikeDto;
import com.lootopia.server.dto.HuntLikeViewDto;
import com.lootopia.server.dto.LikeDto;
import com.lootopia.server.service.HuntService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hunts")
public class HuntController {

    private final HuntService huntService;

    public HuntController(HuntService huntService) {
        this.huntService = huntService;
    }

    @GetMapping("/popularity")
    public ResponseEntity<List<HuntLikeViewDto>> findAllByPopularity(@RequestParam String memberId) {
        return ResponseEntity.ok(huntService.findAllByPopularity(memberId));
    }

    @PostMapping("/like")
    public ResponseEntity<Object> likeHunt(@RequestBody LikeDto likeDto) {
        try {
            HuntLikeDto huntLikeDto = huntService.like(likeDto.memberId(), likeDto.email());
            return ResponseEntity.status(HttpStatus.CREATED).body(huntLikeDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
