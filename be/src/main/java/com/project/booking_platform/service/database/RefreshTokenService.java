package com.project.booking_platform.service.database;

import com.project.booking_platform.model.RefreshToken;
import com.project.booking_platform.repository.RefreshTokenRepository;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.stereotype.Service;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public void addRefreshToken(RefreshToken refreshToken) {
        refreshTokenRepository.save(refreshToken);
    }

    public boolean isTokenValid(String token) {
        var dbToken = refreshTokenRepository.findByToken(token);
        return dbToken.isPresent() && dbToken.get().getStatus() != Status.INACTIVE;
    }

    public RefreshToken deactivateRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token).orElse(null);
        if (refreshToken == null) return null;
        refreshToken.setStatus(Status.INACTIVE);
        return refreshTokenRepository.save(refreshToken);
    }
}
