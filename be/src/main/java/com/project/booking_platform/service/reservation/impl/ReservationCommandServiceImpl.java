package com.project.booking_platform.service.reservation.impl;

import com.project.booking_platform.dto.reservation.CreateReservationDto;
import com.project.booking_platform.model.Guest;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.model.Room;
import com.project.booking_platform.repository.GuestRepository;
import com.project.booking_platform.repository.ReservationRepository;
import com.project.booking_platform.repository.RoomRepository;
import com.project.booking_platform.service.reservation.ReservationCommandService;
import com.project.booking_platform.utils.DateUtils;
import com.project.booking_platform.utils.GenerateIdString;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.project.booking_platform.utils.LoggerUtils.LOGGER;

@Service
public class ReservationCommandServiceImpl implements ReservationCommandService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final GuestRepository guestRepository;
//    private final ReservationMapper reservationMapper;

    public ReservationCommandServiceImpl(ReservationRepository reservationRepository, RoomRepository roomRepository, GuestRepository guestRepository) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
//        this.reservationMapper = reservationMapper;
        this.guestRepository = guestRepository;
    }

    @Transactional(rollbackFor = {Throwable.class})
    @Override
    public String insert(CreateReservationDto createReservationDto) throws RuntimeException {

        Optional<Room> roomOptional = roomRepository.findById(createReservationDto.getRoomId());
        if (roomOptional.isEmpty()) {
            throw new RuntimeException("Room not found");
        }
        Optional<Guest> guestOptional = guestRepository.findByUsername(createReservationDto.getGuestName());
        if (guestOptional.isEmpty()) {
            throw new RuntimeException("Guest not found");
        }

        try {
            Reservation reservation = new Reservation();
            reservation.setId(GenerateIdString.generateUniqueId());
            reservation.setGuest(guestOptional.get());
            reservation.setCheckInDate(createReservationDto.getCheckInDate());
            reservation.setCheckOutDate(createReservationDto.getCheckOutDate());
            reservation.setStatus(Status.ACTIVE);
            reservation.setCreatedAt(DateUtils.getTime());
            reservation.setLastModifiedDate(DateUtils.getTime());
            reservation.setRoom(roomOptional.get());
            reservation.setGuest(guestOptional.get());
            reservationRepository.save(reservation);
            return reservation.getId();
        } catch (Exception e) {
            LOGGER.error("Error occurred during insert.", e);
            throw new RuntimeException("Error occurred during creating Reservation", e);
        }}
}