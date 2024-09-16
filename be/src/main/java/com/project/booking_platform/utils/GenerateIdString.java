package com.project.booking_platform.utils;

import java.security.SecureRandom;

public class GenerateIdString {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateUniqueId() {
        StringBuilder id = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            id.append(CHARACTERS.charAt(index));
        }
        return id.toString();
    }
}