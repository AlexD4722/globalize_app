package com.project.booking_platform.dto.property;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PropertySearchResultDTO {
    private String id;
    private String property_type;
    private String name;
    private String addressSpecific;
    private String featured_picture;
    private int numberOfReviews;
    private double avgRating;
    private float minPrice;
}
