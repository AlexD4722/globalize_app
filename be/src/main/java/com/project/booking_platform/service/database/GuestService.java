package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.auth.GuestDTO;
import com.project.booking_platform.dto.invoice.InvoiceDTO;
import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.model.Guest;
import com.project.booking_platform.model.Invoice;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.repository.GuestRepository;
import com.project.booking_platform.utils.enums.Status;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class GuestService {
    private final GuestRepository guestRepository;
    private final ModelMapper modelMapper;

    public GuestService(GuestRepository guestRepository, ModelMapper modelMapper) {
        this.guestRepository = guestRepository;
        this.modelMapper = modelMapper;
    }

    public Optional<Guest> login(String username, String password) {
        return guestRepository.findByUsernameAndPassword(username, password);
    }

    public List<ReservationDTO> getReservationsByGuestNameAndStatus(String name, Status status) {
        List<Reservation> list = guestRepository.findReservationsByUsernameAndStatus(name, status);
        return list.stream().map(this::convertToDto).toList();
    }

    public List<ReservationDTO> getReservationsByGuestName(String name) {
        List<Reservation> list = guestRepository.findReservationsByUsername(name);
        return list.stream().map(this::convertToDto).toList();
    }

    public List<InvoiceDTO> getInvoicesByGuestId(String name) {
        List<Invoice> list = guestRepository.findInvoicesByUsername(name);
        return list.stream().map(this::convertToDto).toList();
    }

    public GuestDTO getGuestByUsername(String username) {
        var guest = guestRepository.findByUsername(username);
        return guest.map(value -> modelMapper.map(value, GuestDTO.class)).orElse(null);
    }

    private ReservationDTO convertToDto(Reservation reservation) {
        ReservationDTO dto = modelMapper.map(reservation, ReservationDTO.class);
        dto.setPrice(String.valueOf(reservation.getRoom().getPrice()));
        dto.setName(reservation.getRoom().getName());
        dto.setDateCheckIn(reservation.getCheckInDate().toString());
        dto.setDateCheckOut(reservation.getCheckOutDate().toString());
        dto.setRoomPicture(reservation.getRoom().getPicture());
        dto.setCapacity(reservation.getRoom().getMaxGuest());
        dto.setStatus(reservation.getStatus().name());
        return dto;
    }

    private InvoiceDTO convertToDto(Invoice invoice) {
        InvoiceDTO dto = modelMapper.map(invoice, InvoiceDTO.class);
        dto.setPrice(String.valueOf(invoice.getReservation().getRoom().getPrice()));
        dto.setName(invoice.getReservation().getRoom().getName());
        dto.setDateCheckIn(invoice.getReservation().getCheckInDate().toString());
        dto.setDateCheckOut(invoice.getReservation().getCheckOutDate().toString());
        dto.setCapacity(1);
        return dto;
    }
}
