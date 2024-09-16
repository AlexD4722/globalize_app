package com.project.booking_platform.controller;

import com.project.booking_platform.dto.auth.GuestDTO;
import com.project.booking_platform.dto.invoice.InvoiceDTO;
import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.service.database.GuestService;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/guests")
public class GuestController {
    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping("/reservations/{status}")
    public ResponseEntity<List<ReservationDTO>> reservations(@PathVariable String status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return switch (status.toLowerCase()) {
            case "pending" ->
                    ResponseEntity.ok(guestService.getReservationsByGuestNameAndStatus(test.getUsername(), Status.PENDING));
            case "active" ->
                    ResponseEntity.ok(guestService.getReservationsByGuestNameAndStatus(test.getUsername(), Status.ACTIVE));
            case "paid" ->
                    ResponseEntity.ok(guestService.getReservationsByGuestNameAndStatus(test.getUsername(), Status.PAID));
            default -> ResponseEntity.badRequest().build();
        };
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDTO>> reservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(guestService.getReservationsByGuestName(test.getUsername()));
    }

    @GetMapping("/invoices")
    public ResponseEntity<List<InvoiceDTO>> invoices() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(guestService.getInvoicesByGuestId(test.getUsername()));
    }

    @GetMapping("/profile")
    public ResponseEntity<GuestDTO> getGuest() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(guestService.getGuestByUsername(test.getUsername()));
    }
}
