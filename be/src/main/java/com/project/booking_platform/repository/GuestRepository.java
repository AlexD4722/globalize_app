package com.project.booking_platform.repository;

import com.project.booking_platform.model.Guest;
import com.project.booking_platform.model.Invoice;
import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.utils.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuestRepository extends JpaRepository<Guest, String> {
    public Optional<Guest> findByUsername(String username);
    public Optional<Guest> findByUsernameAndPassword(String username, String password);

    @Query("SELECT r FROM Reservation r WHERE r.guest.username = :name AND r.status = :status")
    public List<Reservation> findReservationsByUsernameAndStatus(String name, Status status);

    @Query("SELECT r FROM Reservation r WHERE r.guest.username = :name")
    public List<Reservation> findReservationsByUsername(String name);

    @Query("SELECT i FROM Invoice i WHERE i.reservation.guest.username = :name")
    public List<Invoice> findInvoicesByUsername(String name);
}
