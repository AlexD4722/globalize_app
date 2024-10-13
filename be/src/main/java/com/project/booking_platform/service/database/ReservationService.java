package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.repository.ReservationRepository;
import com.project.booking_platform.utils.enums.Status;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;

    public ReservationService(ReservationRepository reservationRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
    }
    public void setReservationStatus(String id, Status status) {
        var reservation = reservationRepository.findById(id).orElse(null);
        if (reservation == null) {
            return;
        }
        reservation.setStatus(status);
        reservationRepository.save(reservation);
    }

    public List<ReservationDTO> getReservationsByOwner(String userName) {
        var list = reservationRepository.findReservationsByOwner(userName);
        return list.stream().map(this::convertToDto).toList();
    }

    public void removeReservation(String id) {
        reservationRepository.deleteById(id);
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public List<ReservationDTO> getReservationsByOwnerAndStatus(String userName, Status status) {
        var list = reservationRepository.findReservationsByOwner(userName);
        var now = LocalDate.now();
        list.forEach(r -> {
            if (r.getStatus() == Status.ACTIVE && now.isAfter(r.getCheckOutDate())) {
                r.setStatus(Status.COMPLETED);
                reservationRepository.save(r);
            }
        });
        return list.stream().filter(r -> r.getStatus() == status).map(this::convertToDto).toList();
    }

    public List<ReservationDTO> getReservationsByGuest(String userName) {
        var list = reservationRepository.findReservationsByGuest(userName);
        return list.stream().map(this::convertToDto).toList();
    }

    private ReservationDTO convertToDto(Reservation reservation) {
        ReservationDTO dto = new ReservationDTO();
        modelMapper.map(reservation, dto);
        dto.setPrice(String.valueOf(reservation.getRoom().getPrice()));
        dto.setName(reservation.getRoom().getProperty().getName());
        dto.setDateCheckIn(reservation.getCheckInDate().toString());
        dto.setDateCheckOut(reservation.getCheckOutDate().toString());
        dto.setRoomPicture(reservation.getRoom().getPicture());
        dto.setCapacity(reservation.getRoom().getMaxGuest());
        dto.setStatus(reservation.getStatus().name());
        dto.setGuestFirstName(reservation.getGuest().getFirstName());
        dto.setGuestLastName(reservation.getGuest().getLastName());
        return dto;
    }
}
