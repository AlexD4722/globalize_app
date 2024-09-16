package com.project.booking_platform.controller;

import com.project.booking_platform.dto.auth.LoginInfo;
import com.project.booking_platform.model.Admin;
import com.project.booking_platform.model.Guest;
import com.project.booking_platform.model.Owner;
import com.project.booking_platform.model.RefreshToken;
import com.project.booking_platform.service.database.*;
import com.project.booking_platform.utils.token_handling.TokenUtils;
import com.project.booking_platform.utils.token_handling.UserType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final TokenUtils tokenUtils;
    private final GuestService guestService;
    private final AdminService adminService;
    private final OwnerService ownerService;
    private final RefreshTokenService refreshTokenService;

    public AuthController(TokenUtils tokenUtils, GuestService guestService, AdminService adminService, OwnerService ownerService, RefreshTokenService refreshTokenService) {
        this.tokenUtils = tokenUtils;
        this.guestService = guestService;
        this.adminService = adminService;
        this.ownerService = ownerService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody LoginInfo body, HttpServletResponse response) {

        // Check if the login info is correct
        String id = "";
        switch (body.type.actor.toLowerCase()) {
            case "guest":
                Optional<Guest> guest = guestService.login(body.username, body.password);
                if (guest.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                id = guest.get().getId();
                break;
            case "admin":
                Optional<Admin> admin = adminService.login(body.username, body.password);
                if (admin.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                id = admin.get().getId();
                break;
            case "owner":
                Optional<Owner> owner = ownerService.login(body.username, body.password);
                if (owner.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                id = owner.get().getId();
                break;
            default:
                return ResponseEntity.badRequest().build();
        }

        // Create tokens
        String token = tokenUtils.createToken(id, body.type);
        String refreshToken = tokenUtils.createRefreshToken(id, body.type);

        // Save refresh token
        refreshTokenService.addRefreshToken(new RefreshToken(refreshToken));

        // Set cookies
        Cookie tokenCookie = new Cookie("tokenFor" + upper(body.type.actor), token);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(60*60*12);
        response.addCookie(tokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshTokenFor" + upper(body.type.actor), refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60*60*24*24);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(formTokens(token, refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody TokensHolder holder, HttpServletResponse response) {
        // Get refresh token
        String refreshToken = holder.refreshToken;

        // Deactivate refresh token
        refreshTokenService.deactivateRefreshToken(refreshToken);

        // Set cookies
        var payload = tokenUtils.decodeRefreshToken(refreshToken);
        HashMap<String, String> type = (HashMap<String, String>) payload.get("type");
        var actor = upper(type.get("actor"));
        Cookie tokenCookie = new Cookie("tokenFor" + actor, "deleted");
        tokenCookie.setMaxAge(0);
        tokenCookie.setPath("/");
        response.addCookie(tokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshTokenFor" + actor, "deleted");
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<HashMap<String, String>> refresh(@RequestBody TokensHolder holder, HttpServletResponse response) {
        // Get refresh token
        String refreshToken = holder.refreshToken;

        // Check if refresh token is valid
        if (!refreshTokenService.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Generate new tokens
        Claims claims = tokenUtils.decodeRefreshToken(refreshToken);
        String newToken = tokenUtils.regenerateToken(claims);
        String newRefreshToken = tokenUtils.regenerateRefreshToken(claims);

        return ResponseEntity.ok(formTokens(newToken, newRefreshToken));
    }

    private HashMap<String, String> formTokens(String token, String refreshToken) {
        HashMap<String, String> tokenHolder = new HashMap<>();
        tokenHolder.put("token", token);
        tokenHolder.put("refreshToken", refreshToken);
        return tokenHolder;
    }

    private String upper(String s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    public static class TokensHolder {
        public String token;
        public String refreshToken;
    }
}
