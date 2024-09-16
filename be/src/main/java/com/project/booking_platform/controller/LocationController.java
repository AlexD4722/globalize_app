package com.project.booking_platform.controller;

import com.project.booking_platform.model.District;
import com.project.booking_platform.model.Province;
import com.project.booking_platform.model.Ward;
import com.project.booking_platform.service.database.LocationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/provinces")
    public List<Province> getProvinces() {
        return locationService.getProvinces();
    }

    @GetMapping("/provinces/{provinceCode}/districts")
    public List<District> getDistricts(@PathVariable String provinceCode) {
        return locationService.getDistricts(provinceCode);
    }

    @GetMapping("/districts/{districtCode}/wards")
    public List<Ward> getWards(@PathVariable String districtCode) {
        return locationService.getWards(districtCode);
    }
}
