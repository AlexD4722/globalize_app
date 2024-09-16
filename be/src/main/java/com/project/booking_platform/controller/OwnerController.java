package com.project.booking_platform.controller;

import com.project.booking_platform.dto.property.PropertyDTO;
import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.model.Property;
import com.project.booking_platform.service.database.OwnerService;
import com.project.booking_platform.service.jwt.CustomUserDetails;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@PreAuthorize("hasRole('OWNER')")
public class OwnerController {
    private final OwnerService ownerService;
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<PropertyDTO>> getProperties() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            return ResponseEntity.ok(ownerService.getProperties(username));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<String> removeProperty(@PathVariable String id) {
        try {
            ownerService.removeProperty(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/reservations/{status}")
    public ResponseEntity<List<ReservationDTO>> reservations(@PathVariable String status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return switch (status.toLowerCase()) {
            case "pending" ->
                    ResponseEntity.ok(ownerService.getReservationsByUserNameAndStatus(test.getUsername(), Status.PENDING));
            case "active" ->
                    ResponseEntity.ok(ownerService.getReservationsByUserNameAndStatus(test.getUsername(), Status.ACTIVE));
            case "paid" ->
                    ResponseEntity.ok(ownerService.getReservationsByUserNameAndStatus(test.getUsername(), Status.PAID));
            default -> ResponseEntity.badRequest().build();
        };
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDTO>> reservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails test = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(ownerService.getReservationsByUserName(test.getUsername()));
    }
}
