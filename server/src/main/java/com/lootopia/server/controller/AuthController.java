package com.lootopia.server.controller;

import com.lootopia.server.dto.MailDto;
import com.lootopia.server.security.CustomUserDetails;
import com.lootopia.server.service.AuthService;
import com.lootopia.server.service.MailService;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    private final MailService mailService;

    public AuthController(AuthService authService, MailService mailService) {
        this.authService = authService;
        this.mailService = mailService;
    }

    @PostMapping("/register")
    public ResponseEntity<CustomUserDetails> register(@RequestBody MailDto mailDto)
            throws MessagingException {
        UUID activationCode = mailService.sendMessage(mailDto.to());
        CustomUserDetails currentMember = authService
                .askForRegister(activationCode, mailDto.to(), mailDto.rawPassword());

        return ResponseEntity.ok(currentMember);
    }

}
