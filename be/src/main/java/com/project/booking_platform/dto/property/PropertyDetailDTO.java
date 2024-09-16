package com.project.booking_platform.dto.property;

import com.project.booking_platform.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDetailDTO {
    private String id;
    private String property_type;
    private String name;
    private String description;
    private String addressSpecific;
    private String province;
    private String district;
    private String ward;
    private String featured_picture;
    private List<String> pictures;
    private PropertyCommonRule propertyCommonRules;
    private List<Facility> facilities;
    private int numberOfReviews;
    private double avgRating;
    private float minPrice;
    private List<Comment> reviews;
}
