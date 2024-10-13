package com.project.booking_platform.dto.room;

import com.project.booking_platform.model.Amenity;
import com.project.booking_platform.model.Bedroom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomDTO {
    private String id;
    private String type;
    private String name;
    private String description;
    private float price;
    private int maxGuest;
    private String area;
    private String picture;
    private List<Bedroom> bedrooms;
    private List<Amenity> amenities;
}
