package com.project.booking_platform.exception;
import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private Map<String, String> errors;

    public ErrorResponse(int status, String message, Map<String, String> errors) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    // Getters and setters
}