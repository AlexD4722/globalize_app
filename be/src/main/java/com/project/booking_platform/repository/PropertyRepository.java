package com.project.booking_platform.repository;

import com.project.booking_platform.model.Property;
import com.project.booking_platform.service.database.SearchOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {
    @Query("SELECT p FROM Property p " +
            "JOIN p.ward w " +
            "JOIN w.district d " +
            "JOIN d.province pr " +
            "JOIN p.rooms r " +
            "JOIN r.reservations rs " +
            "JOIN rs.comments c " +
            "WHERE pr.name LIKE %:#{#options.city}% " +
            "AND r.maxGuest >= :#{#options.maxGuest} " +
            "AND r.price >= :#{#options.minPrice} " +
            "AND r.price <= :#{#options.maxPrice} " +
            "AND (rs IS NULL OR (rs.checkInDate NOT BETWEEN :#{#options.from} AND :#{#options.to} " +
            "AND rs.checkOutDate NOT BETWEEN :#{#options.from} AND :#{#options.to})) " +
            "GROUP BY p " +
            "HAVING AVG(c.rating) >= :#{#options.minRating} ")
    List<Property> findPropertiesBySearchOptions(SearchOption options);
}