package com.project.booking_platform.service.database;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
public class SearchOption {
    public String city;
    public int maxGuest;
    public LocalDate from;
    public LocalDate to;
    public int minPrice;
    public int maxPrice;
    public int minRating;
    public List<String> facilities;

    public SearchOption(String city, int guest, Optional<String> from, Optional<String> to) {
        this.city = city;
        this.maxGuest = guest;
        this.minRating = 0;
        this.minPrice = 0;
        this.maxPrice = 100000;
        this.facilities = null;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        this.from = from.map(date -> LocalDate.parse(date, formatter)).orElse(null);
        this.to = to.map(date -> LocalDate.parse(date, formatter)).orElse(null);
    }

    public SearchOption(String city) {
        this.city = city;
        this.maxGuest = 0;
        this.minRating = 0;
        this.minPrice = 0;
        this.maxPrice = 100000;
        this.facilities = null;
        this.from = LocalDate.MIN;
        this.to = LocalDate.MAX;
    }
}