package com.livrariasd.api.auth.service;

import com.livrariasd.api.auth.dto.LoginDto;
import com.livrariasd.api.auth.dto.RegisterDto;
import com.livrariasd.api.auth.entity.User;
import com.livrariasd.api.auth.repository.AuthRepository;
import com.livrariasd.api.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthRepository repo;
    @Autowired
    private TokenService tokenService;

    private BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder(10);

    public User verifyToken(HttpServletRequest request) {
        String recoveredToken = tokenService.recoverToken(request);
        if (recoveredToken != null) {
            var email = tokenService.validateToken(recoveredToken);
            Optional<User> user = repo.findByEmail(email);
            if (user.isPresent()) {
                return user.get();
            }
            throw new RuntimeException("Invalid token");
        }
        throw new RuntimeException("Token not found");
    }

    public User register(RegisterDto user, HttpServletResponse response) {
        if (repo.findByEmail(user.email()).isPresent()) throw new IllegalArgumentException("Email already exists");
        User newUser = repo.save(new User(user.username(), user.email(), bcrypt.encode(user.password())));
        tokenService.generateToken(newUser, response);
        return newUser;
    }

    public User login(LoginDto data, HttpServletResponse response) {
        Optional<User> user = repo.findByEmail(data.email());
        if (user.isEmpty()) throw new BadCredentialsException("User not found");
        boolean isPasswordValid = bcrypt.matches(data.password(), user.get().getHashPassword());
        if (!isPasswordValid) throw new BadCredentialsException("Invalid password");
        tokenService.generateToken(user.get(), response);
        return user.get();
    }
}