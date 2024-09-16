package com.project.booking_platform.dto.reservation;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateMultipleReservationsRequestDto {
    @NotEmpty(message = "Reservations list is required")
    List<CreateReservationRequestDto> reservations;
}