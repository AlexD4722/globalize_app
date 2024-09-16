package com.project.booking_platform.dto.property;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
    String id;
    String name;
    String description;
    String addressSpecific;
    String locationGps;
    String picture;
}
