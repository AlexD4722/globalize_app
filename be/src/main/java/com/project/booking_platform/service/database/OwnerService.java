package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.property.PropertyDTO;
import com.project.booking_platform.dto.reservation.ReservationDTO;
import com.project.booking_platform.model.Owner;
import com.project.booking_platform.model.Property;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.repository.OwnerRepository;
import com.project.booking_platform.repository.PropertyRepository;
import com.project.booking_platform.service.fileupload.FileStorageService;
import com.project.booking_platform.utils.enums.Status;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private final ModelMapper modelMapper;
    private final FileStorageService fileService;
    private final PropertyRepository propertyRepository;

    public OwnerService(OwnerRepository ownerRepository, ModelMapper modelMapper, FileStorageService fileService, PropertyRepository propertyRepository) {
        this.ownerRepository = ownerRepository;
        this.modelMapper = modelMapper;
        this.fileService = fileService;
        this.propertyRepository = propertyRepository;
    }

    public Optional<Owner> login(String userName, String password) {
        return ownerRepository.findByUserNameAndPassword(userName, password);
    }

    public List<PropertyDTO> getProperties(String userName) {
        return ownerRepository.findPropertiesByUserName(userName).stream()
                .map(property -> {
                    String featuredFolder = "property/" + property.getPicture() + "/feature/";
                    property.setPicture(featuredFolder + fileService.getFileNames(featuredFolder).stream().findFirst().orElse(null));
                    return modelMapper.map(property, PropertyDTO.class);
                })
                .toList();
    }

    public void removeProperty(String propertyId) {
        propertyRepository.deleteById(propertyId);
    }

    public List<ReservationDTO> getReservationsByUserNameAndStatus(String userName, Status status) {
        var list =ownerRepository.findReservationsByUserNameAndStatus(userName, status);
        return list.stream().map(this::convertToDto).toList();
    }

    public List<ReservationDTO> getReservationsByUserName(String userName) {
        var list = ownerRepository.findReservationsByUsername(userName);
        return list.stream().map(this::convertToDto).toList();
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
}
