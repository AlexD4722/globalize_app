package com.project.booking_platform.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.booking_platform.model.Room;
import com.project.booking_platform.utils.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationSummaryDto {
    String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date checkInDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date checkOutDate;
    Status status;
    Room room;
}