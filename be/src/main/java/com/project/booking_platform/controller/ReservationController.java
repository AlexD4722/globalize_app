package com.project.booking_platform.controller;

import com.project.booking_platform.dto.auth.GuestDTO;
import com.project.booking_platform.dto.reservation.CreateMultipleReservationsRequestDto;
import com.project.booking_platform.dto.reservation.CreateReservationDto;
import com.project.booking_platform.dto.reservation.CreateReservationRequestDto;
import com.project.booking_platform.responses.ResponseHandler;
import com.project.booking_platform.service.database.GuestService;
import com.project.booking_platform.service.email.EmailService;
import com.project.booking_platform.service.reservation.ReservationCommandService;
import com.project.booking_platform.service.room.RoomQueryService;
import com.project.booking_platform.utils.DateUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/reservation")
public class ReservationController {
    private final ReservationCommandService reservationCommandService;
    private final RoomQueryService roomQueryService;
    private final EmailService emailService;
    private final GuestService guestService;

    public ReservationController(ReservationCommandService reservationCommandService, RoomQueryService roomQueryService, EmailService emailService, GuestService guestService) {
        this.reservationCommandService = reservationCommandService;
        this.roomQueryService = roomQueryService;
        this.emailService = emailService;
        this.guestService = guestService;
    }

    private ResponseEntity<Object> buildAndValidateReservationDto(CreateReservationRequestDto createReservationRequestDto, LocalDate today) {
        CreateReservationDto createReservationDto = new CreateReservationDto();
        createReservationDto.setRoomId(createReservationRequestDto.getRoomId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        createReservationDto.setGuestName(authentication.getName());
        try {
            createReservationDto.setCheckInDate(DateUtils.parseInputDate(createReservationRequestDto.getCheckInDate()));
            createReservationDto.setCheckOutDate(DateUtils.parseInputDate(createReservationRequestDto.getCheckOutDate()));
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    "CheckIn and CheckOut Dates should be in the format ddMMyyyy",
                    HttpStatus.BAD_REQUEST,
                    null
            );
        }
        if (createReservationDto.getCheckInDate().isBefore(today) || createReservationDto.getCheckOutDate().isBefore(today)) {
            return ResponseHandler.responseBuilder(
                    "CheckIn Date and CheckOut Date should not be in the past",
                    HttpStatus.BAD_REQUEST,
                    null
            );
        }

        if (createReservationDto.getCheckInDate().isAfter(createReservationDto.getCheckOutDate()) || createReservationDto.getCheckInDate().isEqual(createReservationDto.getCheckOutDate())) {
            return ResponseHandler.responseBuilder(
                    "CheckIn Date should be less than CheckOut Date",
                    HttpStatus.BAD_REQUEST,
                    null
            );
        }
        return ResponseEntity.ok(createReservationDto);
    }

    @Transactional
    @PostMapping("/multiple")
    public ResponseEntity<Object> createMultipleReservations(@RequestBody @Valid CreateMultipleReservationsRequestDto createMultipleReservationsRequestDto) {
        LocalDate today = LocalDate.now();
        List<CreateReservationDto> validReservations = new ArrayList<>();

        // First, validate all reservations
        for (CreateReservationRequestDto createReservationRequestDto : createMultipleReservationsRequestDto.getReservations()) {
            ResponseEntity<Object> response = buildAndValidateReservationDto(createReservationRequestDto, today);
            if (response.getStatusCode() != HttpStatus.OK) {
                return response;
            }
            validReservations.add((CreateReservationDto) response.getBody());
        }

        try {
            // Check room availability and insert reservations
            for (CreateReservationDto createReservationDto : validReservations) {
                if (!roomQueryService.CheckRoomAvailability(createReservationDto.getRoomId(), createReservationDto.getCheckInDate(), createReservationDto.getCheckOutDate())) {
                    return ResponseHandler.responseBuilder(
                            "Room is not available for the given dates",
                            HttpStatus.CONFLICT,
                            null
                    );
                }
            }

            for (CreateReservationDto createReservationDto : validReservations) {
                reservationCommandService.insert(createReservationDto);
            }

        } catch (Exception e) {
            // If any error occurs, the transaction will be rolled back
            return ResponseHandler.responseBuilder(
                    "An error occurred: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null
            );
        }

        try {
            // Send email to the guest
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            GuestDTO guestDTO = guestService.getGuestByUsername(username);
            emailService.sendEmail(guestDTO.getEmail(), "Booking Successfully", "Your booking has been successfully created.");
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    "Error occurred during sending email: " + e.getMessage(),
                    HttpStatus.CREATED,
                    null
            );
        }

        return ResponseHandler.responseBuilder(
                "Reservations Created Successfully",
                HttpStatus.CREATED,
                null
        );
    }

    @Transactional
    @PostMapping("")
    public ResponseEntity<Object> createReservation(@RequestBody @Valid CreateReservationRequestDto createReservationRequestDto) {
        LocalDate today = LocalDate.now();
        ResponseEntity<Object> response = buildAndValidateReservationDto(createReservationRequestDto, today);
        if (response.getStatusCode() != HttpStatus.OK) {
            return response;
        }
        CreateReservationDto createReservationDto = (CreateReservationDto) response.getBody();
        if (roomQueryService.CheckRoomAvailability(createReservationRequestDto.getRoomId(), createReservationDto.getCheckInDate(), createReservationDto.getCheckOutDate())) {
            try {
                reservationCommandService.insert(createReservationDto);
                return ResponseHandler.responseBuilder(
                        "Reservation Created Successfully",
                        HttpStatus.CREATED,
                        null
                );
            } catch (Exception e) {
                return ResponseHandler.responseBuilder(
                        "Error occurred during creating Reservation",
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        null
                );
            }
        }

        try {
            // Send email to the guest
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            GuestDTO guestDTO = guestService.getGuestByUsername(username);
            emailService.sendEmail(guestDTO.getEmail(), "Booking Successfully", "Your booking has been successfully created.");
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    "Error occurred during sending email: " + e.getMessage(),
                    HttpStatus.CREATED,
                    null
            );
        }

        return ResponseHandler.responseBuilder(
                "Error occurred during creating Reservation",
                HttpStatus.CONFLICT,
                null
        );
    }
}