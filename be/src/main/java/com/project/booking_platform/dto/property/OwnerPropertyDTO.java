package com.project.booking_platform.dto.property;

import com.project.booking_platform.utils.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerPropertyDTO {
    String id;
    String name;
    String description;
    String addressSpecific;
    String locationGps;
    String picture;
    Status status;
}
