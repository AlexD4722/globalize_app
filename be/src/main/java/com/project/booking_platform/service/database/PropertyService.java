package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.property.PropertyDetailDTO;
import com.project.booking_platform.dto.property.PropertySearchResultDTO;
import com.project.booking_platform.model.*;
import com.project.booking_platform.repository.PropertyRepository;
import com.project.booking_platform.service.fileupload.FileStorageService;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final ModelMapper mapper;
    private final FileStorageService fileService;

    public PropertyService(PropertyRepository propertyRepository, ModelMapper mapper, FileStorageService fileService) {
        this.propertyRepository = propertyRepository;
        this.mapper = mapper;
        this.fileService = fileService;
    }

    public PropertyDetailDTO getPropertyDetail(String id) {
        Property property = propertyRepository.findById(id).orElse(null);
        if (property == null) {
            return null;
        }
        PropertyDetailDTO dto = mapper.map(property, PropertyDetailDTO.class);
        List<Facility> facilities = property.getPropertyFacilities().stream().map(PropertyFacility::getFacility).toList();
        List<Comment> comments = new ArrayList<>();
        for (Room room : property.getRooms()) {
            for (Reservation reservation : room.getReservations()) {
                comments.addAll(reservation.getComments());
            }
        }
        dto.setFacilities(facilities);
        dto.setPropertyCommonRules(property.getPropertyCommonRules());
        dto.setNumberOfReviews(comments.size());
        dto.setAvgRating(comments.stream().mapToInt(Comment::getRating).average().orElse(0));
        dto.setMinPrice(property.getRooms().stream().map(Room::getPrice).min(Float::compareTo).orElse(0f));
        dto.setReviews(comments);
        String pictureFolder = "property/" + property.getPicture();
        String featuredFolder = pictureFolder + "/feature/";
        dto.setFeatured_picture(featuredFolder + fileService.getFileNames(featuredFolder).stream().findFirst().orElse(null));
        dto.setPictures(fileService.getFileNames(pictureFolder).stream().map(p -> pictureFolder + "/" + p).toList());
        return dto;
    }

    public List<PropertySearchResultDTO> search(SearchOption options) {
        List<Property> firstSearch = propertyRepository.findPropertiesBySearchOptions(options);
        var secondSearch = new ArrayList<Property>(firstSearch);
        if (!(options.facilities == null || options.facilities.isEmpty())) {
            for (Property property : firstSearch) {
                List<Facility> facilities = property.getPropertyFacilities().stream().map(PropertyFacility::getFacility).toList();
                for (String facility : options.facilities) {
                    if (facilities.stream().noneMatch(f -> f.getName().equals(facility))) {
                        secondSearch.remove(property);
                        break;
                    }
                }
            }
        }

        List<PropertySearchResultDTO> list = secondSearch.stream().map(p -> {
            var dto = mapper.map(p, PropertySearchResultDTO.class);
            List<Room> rooms = p.getRooms();
            String featuredFolder = "property/" + p.getPicture() + "/feature/";
            String picture = featuredFolder + fileService.getFileNames(featuredFolder).stream().findFirst().orElse(null);
            dto.setFeatured_picture(picture);
            dto.setMinPrice(rooms.stream().map(Room::getPrice).min(Float::compareTo).orElse(0f));
            dto.setAvgRating(rooms.stream().flatMap(r -> r.getReservations().stream()).flatMap(r -> r.getComments().stream()).mapToInt(Comment::getRating).average().orElse(0));
            dto.setNumberOfReviews(
                    (int) rooms.stream()
                            .flatMap(r -> r.getReservations().stream())
                            .mapToLong(r -> r.getComments().size())
                            .count()
            );
            return dto;
        }).toList();
        return list;
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(String id) {
        propertyRepository.deleteById(id);
    }
}
