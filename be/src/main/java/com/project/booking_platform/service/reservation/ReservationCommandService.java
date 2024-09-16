package com.project.booking_platform.service.reservation;
import com.project.booking_platform.dto.reservation.CreateReservationDto;
import com.project.booking_platform.dto.reservation.CreateReservationRequestDto;

public interface ReservationCommandService {
    void insert(CreateReservationDto createReservationDto);
}