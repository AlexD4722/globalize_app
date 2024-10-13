package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.property.OwnerPropertyDTO;
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

    public List<OwnerPropertyDTO> getProperties(String userName) {
        return ownerRepository.findPropertiesByUserName(userName).stream()
                .map(property -> {
                    String link = "api/files/property/" + property.getPicture() + "/feature/";
                    String featuredFolder = "property/" + property.getPicture() + "/feature";
                    property.setPicture(link + fileService.getFileNames(featuredFolder).stream().findFirst().orElse(null));
                    return modelMapper.map(property, OwnerPropertyDTO.class);
                })
                .toList();
    }

    public void removeProperty(String propertyId) {
        propertyRepository.deleteById(propertyId);
    }

    public Owner getOwner(String userName) {
        return ownerRepository.findByUserName(userName).orElse(null);
    }
}
