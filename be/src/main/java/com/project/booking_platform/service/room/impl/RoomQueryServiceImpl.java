package com.project.booking_platform.service.room.impl;


import com.project.booking_platform.repository.custom.room.RoomRepoCustom;
import com.project.booking_platform.service.room.RoomQueryService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class RoomQueryServiceImpl  implements RoomQueryService {
    private final RoomRepoCustom roomRepoCustom;
    public RoomQueryServiceImpl(RoomRepoCustom roomRepoCustom) {
        this.roomRepoCustom = roomRepoCustom;
    }
    @Override
    public boolean CheckRoomAvailability(String roomId, LocalDate startDate, LocalDate endDate) {
        return roomRepoCustom.isRoomAvailable(roomId, startDate, endDate);
    }
}
