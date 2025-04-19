package com.lootopia.server.controller;

import com.azure.core.http.rest.Response;
import com.azure.storage.blob.models.BlockBlobItem;
import com.lootopia.server.exceptions.AzureUploadException;
import com.lootopia.server.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/avatar")
    public ResponseEntity<Object> uploadAvatar(@RequestHeader("Authorization") String token,
                                               @RequestParam(value = "file") MultipartFile file) {
        try {
            Response<BlockBlobItem> response = memberService.uploadAvatar(token, file);

            if (response.getStatusCode() != HttpStatus.CREATED.value()) {
                throw new AzureUploadException(response.getHeaders().toString());
            }

            return ResponseEntity.status(HttpStatusCode.valueOf(response.getStatusCode())).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException | AzureUploadException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
