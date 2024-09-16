package com.project.booking_platform.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    public static final String ALTERNATE_DATE_TIME_FORMAT = "EEE MMM dd HH:mm:ss zzz yyyy";
    public static final String INPUT_DATE_FORMAT = "ddMMyyyy";

    public static String convertTime(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);
        return formatter.format(date);
    }

    public static Date getTime() {
        return new Date();
    }

    public static LocalDate parseInputDate(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(INPUT_DATE_FORMAT);
        return LocalDate.parse(dateStr, formatter);
    }
}