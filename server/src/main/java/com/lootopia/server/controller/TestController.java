package com.lootopia.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping
    public String hello() {
        return "You are connected to the server!";
    }

    @GetMapping("/admin")
    public String admin() {
        return "You are connected to the server!";
    }

}