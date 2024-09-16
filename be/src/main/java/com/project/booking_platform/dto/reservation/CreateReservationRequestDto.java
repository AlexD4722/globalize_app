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
public class CreateReservationRequestDto {
    @NotNull(message = "Check-in date is required")
    String checkInDate;
    @NotNull(message = "Check-out date is required")
    String checkOutDate;
    @NotEmpty(message = "Room ID is required")
    String roomId;
    String guestName;
}