package com.livrariasd.api.auth.controller;

import com.livrariasd.api.auth.dto.LoginDto;
import com.livrariasd.api.auth.dto.RegisterDto;
import com.livrariasd.api.auth.dto.ResponseUserDto;
import com.livrariasd.api.auth.entity.User;
import com.livrariasd.api.auth.service.AuthService;
import com.livrariasd.api.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @GetMapping()
    public ResponseEntity<ResponseUserDto> verifyToken(HttpServletRequest request) {
        try {
            User user = service.verifyToken(request);
            return ResponseEntity.ok(new ResponseUserDto(user.getId(), user.getUsername(), user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseUserDto> register(@RequestBody RegisterDto user, HttpServletResponse response) {
        try {
            User newUser = service.register(user, response);
            return ResponseEntity.ok(new ResponseUserDto(newUser.getId(), newUser.getUsername(), newUser.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(409).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseUserDto> login(@RequestBody LoginDto data, HttpServletResponse response) {
        try {
            User user = service.login(data, response);
            return ResponseEntity.ok(new ResponseUserDto(user.getId(), user.getUsername(), user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
