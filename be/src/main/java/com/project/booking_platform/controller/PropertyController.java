package com.project.booking_platform.controller;

import com.project.booking_platform.dto.property.PropertyDetailDTO;
import com.project.booking_platform.dto.property.PropertySearchResultDTO;
import com.project.booking_platform.dto.room.RoomDTO;
import com.project.booking_platform.model.Property;
import com.project.booking_platform.service.database.PropertyService;
import com.project.booking_platform.service.database.RoomService;
import com.project.booking_platform.service.database.SearchOption;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/property")
public class PropertyController {
    private final PropertyService propertyService;
    private final RoomService roomService;

    public PropertyController(PropertyService propertyService, RoomService roomService) {
        this.propertyService = propertyService;
        this.roomService = roomService;
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<PropertyDetailDTO> getPropertyDetails(@PathVariable String id) {
        try {
            PropertyDetailDTO data = this.propertyService.getPropertyDetail(id);
            return ResponseEntity.ok(data);
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/details/{id}/rooms")
    public ResponseEntity<List<RoomDTO>> getRooms(@PathVariable String id, @RequestParam MultiValueMap<String, String> params) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
            if (params.getFirst("from") == null || params.getFirst("to") == null) {
                List<RoomDTO> dtoList = this.roomService.getRoomsByPropertyId(id);
                return ResponseEntity.ok(dtoList);
            }
            var dateFrom = LocalDate.parse(params.getFirst("from"), formatter);
            var dateTo = LocalDate.parse(params.getFirst("to"), formatter);
            List<RoomDTO> dtoList = this.roomService.getRoomsByPropertyId(id, dateFrom, dateTo);
            return ResponseEntity.ok(dtoList);
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<PropertySearchResultDTO>> propertySearch(@RequestParam MultiValueMap<String, String> params) {
        try {

            // Get parameters
            String city = params.getFirst("city");
            Optional<String> adults = Optional.ofNullable(params.getFirst("adults"));
            Optional<String> children = Optional.ofNullable(params.getFirst("children"));
            Optional<String> from = Optional.ofNullable(params.getFirst("from"));
            Optional<String> to = Optional.ofNullable(params.getFirst("to"));
            Optional<String> minPrice = Optional.ofNullable(params.getFirst("minPrice"));
            Optional<String> maxPrice = Optional.ofNullable(params.getFirst("maxPrice"));
            Optional<String> minRating = Optional.ofNullable(params.getFirst("minRating"));
            Optional<List<String>> facilities = Optional.ofNullable(params.get("facility"));

            // Create search option
            SearchOption options = new SearchOption(city);
            adults.ifPresent(string -> options.maxGuest = children.map(s -> Integer.parseInt(string) + Integer.parseInt(s)).orElseGet(() -> Integer.parseInt(string)));
            if (from.isPresent() && to.isPresent()) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
                options.from = from.map(date -> LocalDate.parse(date, formatter)).orElse(null);
                options.to = to.map(date -> LocalDate.parse(date, formatter)).orElse(null);
            }
            if (minPrice.isPresent() && maxPrice.isPresent()) {
                options.minPrice = Integer.parseInt(minPrice.get());
                options.maxPrice = Integer.parseInt(maxPrice.get());
                if (options.minPrice < 0 || options.minPrice > options.maxPrice) {
                    return ResponseEntity.badRequest().build();
                }
            }
            minRating.ifPresent(s -> options.minRating = Integer.parseInt(s));
            if (options.minRating < 0 || options.minRating > 10) {
                return ResponseEntity.badRequest().build();
            }
            facilities.ifPresent(strings -> options.facilities = strings);

            // Search data
            List<PropertySearchResultDTO> response = propertyService.search(options);

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Property> createProperty(Property p){
        try {
            return ResponseEntity.ok(propertyService.saveNewProperty(p));
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/disable")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity disableProperty(@PathVariable String id){
        try {
            propertyService.disableProperty(id);
            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }
}
