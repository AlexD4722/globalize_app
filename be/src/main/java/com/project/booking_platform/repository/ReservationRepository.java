package com.project.booking_platform.repository;
import com.project.booking_platform.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    @Query("SELECT r FROM Reservation r WHERE r.room.property.owner.userName = :name")
    public List<Reservation> findReservationsByOwner(String name);

    @Query("SELECT r FROM Reservation r WHERE r.guest.username = :name")
    public List<Reservation> findReservationsByGuest(String name);
}