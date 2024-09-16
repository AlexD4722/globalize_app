package com.project.booking_platform.dto.room;

import com.project.booking_platform.dto.reservation.ReservationSummaryDto;
import com.project.booking_platform.utils.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomReservationSummaryDto {
    String id;
    String name;
    Status status;
    List<ReservationSummaryDto> reservations;
}
