package com.project.booking_platform.service.room;

import java.time.LocalDate;
import java.util.Date;

public interface RoomQueryService {
    boolean CheckRoomAvailability(String roomId, LocalDate startDate, LocalDate endDate);
}