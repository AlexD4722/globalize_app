package com.project.booking_platform.repository.custom.room;

import com.project.booking_platform.dto.room.RoomReservationSummaryDto;

import java.time.LocalDate;
import java.util.Date;

public interface RoomRepoCustom {
    Boolean isRoomAvailable(String roomId, LocalDate startDate, LocalDate endDate);
}