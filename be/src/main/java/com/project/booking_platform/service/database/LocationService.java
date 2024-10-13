package com.project.booking_platform.service.database;

import com.project.booking_platform.model.District;
import com.project.booking_platform.model.Province;
import com.project.booking_platform.model.Ward;
import com.project.booking_platform.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Province> getProvinces() {
        return locationRepository.findAll();
    }

    public List<District> getDistricts(String provinceCode) {
        return locationRepository.findDistricts(provinceCode);
    }

    public List<Ward> getWards(String districtCode) {
        return locationRepository.findWards(districtCode);
    }

    public Ward getWard(String wardCode) {
        return locationRepository.findWard(wardCode);
    }
}
