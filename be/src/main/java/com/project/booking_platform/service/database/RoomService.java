package com.project.booking_platform.service.database;

import com.project.booking_platform.dto.room.RoomDTO;
import com.project.booking_platform.model.Room;
import com.project.booking_platform.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private ModelMapper mapper;

    public RoomService(RoomRepository roomRepository, ModelMapper mapper) {
        this.roomRepository = roomRepository;
        this.mapper = mapper;
    }

    public Room getRoom(String id) {
        return roomRepository.findById(id).orElse(null);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public List<RoomDTO> getRoomsByPropertyId(String propertyId, LocalDate from, LocalDate to) {
        return roomRepository.findRoomsByPropertyId(propertyId).stream()
                .filter(room -> room.getReservations().stream().allMatch(r -> r.getCheckOutDate().isBefore(from) || r.getCheckInDate().isAfter(to)))
                .map(room -> mapper.map(room, RoomDTO.class))
                .toList();
    }

    public List<RoomDTO> getRoomsByPropertyId(String propertyId) {
        return roomRepository.findRoomsByPropertyId(propertyId).stream()
                .map(room -> mapper.map(room, RoomDTO.class))
                .toList();
    }
}
