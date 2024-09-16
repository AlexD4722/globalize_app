package com.project.booking_platform.repository;

import com.project.booking_platform.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, String> {
    // Get all facilities by property ID
    @Query("SELECT f FROM Facility f JOIN f.propertyFacilities pf JOIN pf.property p WHERE p.id = :id")
    List<Facility> findFacilitiesByPropertyId(String id);
}
