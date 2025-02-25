package com.lootopia.server.controller;

import com.lootopia.server.dto.MailDto;
import com.lootopia.server.service.AuthService;
import com.lootopia.server.service.MailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void register(@RequestBody MailDto mailDto) {
        mailService.sendMessage(mailDto.to(), mailDto.subject(), mailDto.text());
    }

}
