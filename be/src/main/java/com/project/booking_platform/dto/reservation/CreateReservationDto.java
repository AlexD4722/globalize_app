package com.project.booking_platform.dto.reservation;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateReservationDto {
    @NotNull(message = "Check-in date is required")
    LocalDate checkInDate;
    @NotNull(message = "Check-out date is required")
    LocalDate checkOutDate;
    @NotEmpty(message = "Room ID is required")
    String roomId;
    @NotEmpty(message = "Guest name is required")
    String guestName;
}