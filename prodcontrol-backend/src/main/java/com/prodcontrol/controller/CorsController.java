package com.prodcontrol.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CorsController {

    @GetMapping("/test")
    public String test() {
        return "Backend is running! 🚀";
    }

    @GetMapping("/health")
    public String health() {
        return "{\"status\":\"UP\",\"message\":\"ProdControl Backend is healthy\"}";
    }
}
