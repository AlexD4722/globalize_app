package com.project.booking_platform.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
    String id;
    String name;
    String dateCheckIn;
    String dateCheckOut;
    String price;
    String roomPicture;
    int capacity;
    String status;
}