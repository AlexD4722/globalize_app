package com.project.booking_platform.repository;

import com.project.booking_platform.model.Owner;
import com.project.booking_platform.model.Property;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, String> {
    Optional<Owner> findByUserNameAndPassword(String userName, String password);
    @Query("SELECT o.properties FROM Owner o WHERE o.userName = :userName")
    List<Property> findPropertiesByUserName(String userName);

    @Query("SELECT r from Reservation r where r.room.property.owner.userName = :userName and r.status = :status")
    List<Reservation> findReservationsByUserNameAndStatus(String userName, Status status);

    @Query("SELECT r FROM Reservation r WHERE r.room.property.owner.userName = :name")
    public List<Reservation> findReservationsByUsername(String name);
}
