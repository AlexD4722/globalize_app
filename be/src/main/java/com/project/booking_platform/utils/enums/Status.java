package com.project.booking_platform.utils.enums;

public enum Status {
    INACTIVE(0),
    ACTIVE(1),
    PENDING(2),
    PAID(3);


    private final int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}