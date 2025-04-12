package com.lootopia.server.controller;

import com.lootopia.server.dto.HuntLikeDto;
import com.lootopia.server.dto.HuntLikeViewDto;
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
    public ResponseEntity<List<HuntLikeViewDto>> findAllByPopularity(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(huntService.findAllByPopularity(token));
    }

    @PostMapping("{huntId}/like")
    public ResponseEntity<Object> likeHunt(@PathVariable String huntId, @RequestHeader("Authorization") String token) {
        try {
            HuntLikeDto huntLikeDto = huntService.like(token, huntId);
            return ResponseEntity.status(HttpStatus.CREATED).body(huntLikeDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("{huntId}/like")
    public ResponseEntity<Object> unLikeHunt(@PathVariable String huntId, @RequestHeader("Authorization") String token) {
        try {
            HuntLikeDto huntLikeDto = huntService.unLike(token, huntId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(huntLikeDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
