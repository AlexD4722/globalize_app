package com.project.booking_platform.utils.enums;

public enum Status {
    INACTIVE(0),
    ACTIVE(1),
    COMPLETED(2),
    CANCELLED(3),
    CANCEL_REQUESTED(4),
    DISABLED(5);


    private final int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}