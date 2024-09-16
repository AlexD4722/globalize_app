package com.project.booking_platform.repository;

import com.project.booking_platform.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findRoomsByPropertyId(String propertyId);
}


