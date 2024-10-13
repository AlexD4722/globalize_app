package com.project.booking_platform.utils.generate;

import java.util.Random;

public class RandomID {
    private static String generateRandomString(int length, String characters) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        return sb.toString();
    }

    public static String generateRandomID() {
        String characters = "ABCDEFGHIJKLMNPQRSTUVXYZabcdefghijklmnpqrstuvxyz0123456789";
        return generateRandomString(12, characters);
    }
}
