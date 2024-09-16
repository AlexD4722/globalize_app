package com.project.booking_platform.exception;

import lombok.Getter;

@Getter
public class EntityException {
    private final String message;
    private final Throwable throwable;
    private final int httpStatus;

    public EntityException(String message, Throwable throwable, int httpStatus) {
        this.message = message;
        this.throwable = throwable;
        this.httpStatus = httpStatus;
    }

}
