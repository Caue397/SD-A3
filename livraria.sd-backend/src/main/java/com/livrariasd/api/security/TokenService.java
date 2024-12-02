package com.livrariasd.api.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.livrariasd.api.auth.entity.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Autowired
    @Value("${api.security.token.secret}")
    private String secret;

    public void generateToken(User user, HttpServletResponse response) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                        .withIssuer("platform-token")
                        .withSubject(user.getEmail())
                        .withExpiresAt(genExpirationData())
                        .sign(algorithm);
            addTokenToCookie(response, token);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                        .withIssuer("platform-token")
                        .build()
                        .verify(token)
                        .getSubject();
        } catch (JWTVerificationException exception) {
           return "";
        }
    }

    public String recoverToken(HttpServletRequest request){
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("platform-token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public void addTokenToCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("platform-token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);
    }

    public Instant genExpirationData() {
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
    }
}
