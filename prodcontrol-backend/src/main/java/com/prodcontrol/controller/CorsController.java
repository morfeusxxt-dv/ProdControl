package com.prodcontrol.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(
    origins = {
        "https://prodcontrol-lian-git-main-morfeusxxts-projects.vercel.app",
        "https://prod-control-morfeusxxts-projects.vercel.app",
        "https://*.vercel.app"
    },
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowedHeaders = "*",
    maxAge = 3600
)
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
