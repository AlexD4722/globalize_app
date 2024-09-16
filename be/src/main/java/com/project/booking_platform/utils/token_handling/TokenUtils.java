package com.project.booking_platform.utils.token_handling;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
@NoArgsConstructor
public class TokenUtils {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.refresh-secret}")
    private String refreshSecret;

    public String createToken(String subject, UserType type){
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
                .subject(subject)
                .issuedAt(Date.from(Instant.now()))
                .claim("type", type)
                .expiration(Date.from(Instant.now().plusSeconds(12 * 60 * 60)))
                .signWith(key)
                .compact();
    }

    public String createRefreshToken(String subject, UserType type){
        SecretKey key = Keys.hmacShaKeyFor(refreshSecret.getBytes());
        return Jwts.builder()
                .claim("type", type)
                .subject(subject)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(24 * 24 * 60 * 60)))
                .signWith(key)
                .compact();
    }

    public String regenerateToken(Claims claims) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
                .claims(claims)
                .issuedAt(Date.from(Instant.now()))
                .signWith(key)
                .compact();
    }

    public String regenerateRefreshToken(Claims claims) {
        SecretKey key = Keys.hmacShaKeyFor(refreshSecret.getBytes());
        return Jwts.builder()
                .claims(claims)
                .issuedAt(Date.from(Instant.now()))
                .signWith(key)
                .compact();
    }

    public Claims decodeToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }

    public Claims decodeRefreshToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(refreshSecret.getBytes());
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
