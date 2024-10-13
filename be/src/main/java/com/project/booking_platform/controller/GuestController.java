package com.project.booking_platform.controller;

import com.project.booking_platform.dto.auth.GuestDTO;
import com.project.booking_platform.dto.invoice.InvoiceDTO;
import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.service.database.GuestService;
import com.project.booking_platform.service.database.PropertyService;
import com.project.booking_platform.service.database.ReservationService;
import com.project.booking_platform.service.email.EmailService;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/guests")
@PreAuthorize("hasRole('GUEST')")
public class GuestController {
    private final GuestService guestService;
    private final ReservationService reservationService;
    private final EmailService emailService;

    public GuestController(GuestService guestService, PropertyService propertyService, ReservationService reservationService, EmailService emailService) {
        this.guestService = guestService;
        this.reservationService = reservationService;
        this.emailService = emailService;
    }

    @GetMapping("/reservations/{status}")
    public ResponseEntity<List<ReservationDTO>> reservations(@PathVariable String status) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails test = (UserDetails) authentication.getPrincipal();
            HashMap<String, Status> statusMap = new HashMap<>() {{
                put("active", Status.ACTIVE);
                put("completed", Status.COMPLETED);
                put("cancelled", Status.CANCELLED);
                put("requested", Status.CANCEL_REQUESTED);
            }};

            Status statusEnum = statusMap.get(status);
            if (statusEnum == null) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok(guestService.getReservationsByGuestNameAndStatus(test.getUsername(), statusEnum));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDTO>> reservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(reservationService.getReservationsByGuest(test.getUsername()));
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

    @PutMapping("/reservations/{id}/cancel")
    public ResponseEntity<String> requestReservationCancellation(@PathVariable String id) {
        try {
            reservationService.setReservationStatus(id, Status.CANCEL_REQUESTED);
            //Send email to owner
            Reservation reservation = reservationService.getReservationById(id);
            emailService.sendEmail(reservation.getRoom().getProperty().getOwner().getEmail(), "Reservation Cancellation Request", "A guest has requested to cancel their reservation(ID #" + reservation.getId() + " ). Please review the request and take action.");
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
