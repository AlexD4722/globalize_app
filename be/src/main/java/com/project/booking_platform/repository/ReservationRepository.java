package com.project.booking_platform.repository;
import com.project.booking_platform.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
}