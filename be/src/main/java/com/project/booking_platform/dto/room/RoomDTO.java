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
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    String id;
    String name;
    Float  price;
    String picture;
    String description;
    Integer maxGuest;
    Float area;
    Integer floor;
    List<Amenity> amenities;
    List<Bedroom> bedrooms;
}
