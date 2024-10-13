package com.project.booking_platform.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.project.booking_platform.dto.property.OwnerPropertyDTO;

import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.dto.room.CreateRoomDTO;
import com.project.booking_platform.model.*;
import com.project.booking_platform.service.database.LocationService;
import com.project.booking_platform.service.database.OwnerService;
import com.project.booking_platform.service.database.PropertyService;
import com.project.booking_platform.service.database.ReservationService;
import com.project.booking_platform.service.email.EmailService;
import com.project.booking_platform.service.fileupload.FileStorageService;
import com.project.booking_platform.service.jwt.CustomUserDetails;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/owners")
@PreAuthorize("hasRole('OWNER')")
public class OwnerController {
    private final OwnerService ownerService;
    private final FileStorageService fileService;
    private final PropertyService propertyService;
    private final ReservationService reservationService;
    private final LocationService locationService;
    private final EmailService emailService;

    public OwnerController(OwnerService ownerService, FileStorageService fileService, PropertyService propertyService, ReservationService reservationService, LocationService locationService, EmailService emailService) {
        this.ownerService = ownerService;
        this.fileService = fileService;
        this.propertyService = propertyService;
        this.reservationService = reservationService;
        this.locationService = locationService;
        this.emailService = emailService;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<OwnerPropertyDTO>> getProperties() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            return ResponseEntity.ok(ownerService.getProperties(username));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/properties/{id}/disable")
    public ResponseEntity<String> disableProperty(@PathVariable String id) {
        try {
            propertyService.disableProperty(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/properties/{id}/enable")
    public ResponseEntity<String> enableProperty(@PathVariable String id) {
        try {
            propertyService.enableProperty(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
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

            return ResponseEntity.ok(reservationService.getReservationsByOwnerAndStatus(test.getUsername(), statusEnum));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDTO>> reservations() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails test = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(reservationService.getReservationsByOwner(test.getUsername()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/properties")
    public ResponseEntity<Object> addProperty(@RequestParam("name") String name,
                                              @RequestParam("description") String description,
                                              @RequestParam("address") String address,
                                              @RequestParam("type") String type,
                                              @RequestParam("commonRules") String jsonCommonRules,
                                              @RequestParam("coverImage") MultipartFile coverImage,
                                              @RequestParam("images") List<MultipartFile> images,
                                              @RequestParam("facilities") String jsonFacilities,
                                              @RequestParam("rooms") String jsonRooms,
                                              @RequestParam("refundPercentage") String refundPercentage,
                                              @RequestParam("refundAllowedDays") String refundAllowedDays,
                                              @RequestParam("wardCode") String wardCode) {
        try {
            // Parse JSON
            ObjectMapper oMapper = new ObjectMapper();
            oMapper.registerModule(new JavaTimeModule());
            List<Facility> facilities = oMapper.readValue(jsonFacilities, new TypeReference<List<Facility>>() {
            });
            List<CreateRoomDTO> roomDTOs = oMapper.readValue(jsonRooms, new TypeReference<List<CreateRoomDTO>>() {
            });
            PropertyCommonRule commonRules = oMapper.readValue(jsonCommonRules, PropertyCommonRule.class);
            Ward ward = locationService.getWard(wardCode);

            // Create property
            Property p = new Property();
            p.setName(name);
            p.setDescription(description);
            p.setAddressSpecific(address);
            p.setRefundPercent(Integer.parseInt(refundPercentage));
            p.setRefundAllowedDays(Integer.parseInt(refundAllowedDays));
            List<Room> rooms = roomDTOs.stream().map(r -> {
                Room room = new Room();
                room.setName(r.getName());
                room.setPrice(r.getPrice());
                room.setMaxGuest(r.getMaxGuest());
                room.setArea(Float.parseFloat(r.getArea()));
                room.setBedrooms(r.getBedrooms());
                return room;
            }).toList();
            p.setWard(ward);
            p.setRooms(rooms);
            p.setOwner(ownerService.getOwner(SecurityContextHolder.getContext().getAuthentication().getName()));
            p.setStatus(Status.ACTIVE);
            p.setCreatedAt(Date.from(Instant.now()));
            p.setLastModifiedDate(Date.from(Instant.now()));
            Property savedProperty = propertyService.saveNewProperty(p);

            // Save images and set property picture
            String propertyId = savedProperty.getId();
            String coverImagePath = fileService.storePropertyFeaturedPicture(coverImage, propertyId);
            List<String> imagePaths = images.stream().map(i -> fileService.storePropertyPictures(i, propertyId)).toList();
            savedProperty.setPicture(propertyId);

            return ResponseEntity.ok(propertyService.updateProperty(savedProperty));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/reservations/{id}/responseCancelRequest")
    public ResponseEntity<String> responseCancelRequest(@PathVariable String id, @RequestParam String response) {
        try {
            if (!response.equals("accept") && !response.equals("reject")) {
                return ResponseEntity.badRequest().build();
            }
            Reservation reservation = reservationService.getReservationById(id);
            String guestEmail = reservation.getGuest().getEmail();
            if (response.equals("accept")) {
                reservationService.setReservationStatus(id, Status.CANCELLED);
                sendAcceptEmail(guestEmail);
            }
            if (response.equals("reject")) {
                reservationService.setReservationStatus(id, Status.ACTIVE);
                sendRejectEmail(guestEmail);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private void sendRejectEmail(String to) {
        emailService.sendEmail(to, "Cancel request rejected", "Your cancel request has been rejected.");
    }

    private void sendAcceptEmail(String to) {
        emailService.sendEmail(to, "Cancel request accepted", "Your cancel request has been accepted.");
    }
}
