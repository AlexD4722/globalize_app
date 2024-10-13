package com.project.booking_platform.config;

import com.project.booking_platform.dto.property.PropertyDetailDTO;
import com.project.booking_platform.dto.property.PropertySearchResultDTO;
import com.project.booking_platform.dto.room.RoomDTO;
import com.project.booking_platform.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Configuration
public class MapperConfig {
    private final ModelMapper modelMapper;

    public MapperConfig() {
        this.modelMapper = new ModelMapper();
    }

    @Bean
    public ModelMapper modelMapper() {
        modelMapper.createTypeMap(Property.class, PropertyDetailDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getWard().getDistrict().getProvince().getName(), PropertyDetailDTO::setProvince);
            mapper.map(src -> src.getWard().getDistrict().getName(), PropertyDetailDTO::setDistrict);
            mapper.map(src -> src.getWard().getName(), PropertyDetailDTO::setWard);
            mapper.map(Property::getPicture, PropertyDetailDTO::setFeatured_picture);
            mapper.map(Property::getPropertyCommonRules, PropertyDetailDTO::setPropertyCommonRules);
            mapper.map(src -> {
                var pfs = src.getPropertyFacilities();
                if (pfs == null) {
                    return new ArrayList<Facility>();
                }
                return pfs.stream().map(PropertyFacility::getFacility).collect(Collectors.toList());
            }, PropertyDetailDTO::setFacilities);
        });
        modelMapper.createTypeMap(Property.class, PropertySearchResultDTO.class).addMappings(mapper -> {
            mapper.map(Property::getPicture, PropertySearchResultDTO::setFeatured_picture);
        });
        modelMapper.createTypeMap(Room.class, RoomDTO.class).addMappings(mapper -> {
            mapper.map(src -> {
                var list = src.getAmenityLists();
                if (list == null) {
                    return new ArrayList<Amenity>();
                }
                return list.stream().map(AmenityList::getAmenity).collect(Collectors.toList());
            }, RoomDTO::setAmenities);
        });
        return this.modelMapper;
    }
}
