package com.project.booking_platform.repository.custom.room.impl;

import com.project.booking_platform.model.Reservation;
import com.project.booking_platform.model.Room;
import com.project.booking_platform.repository.custom.room.RoomRepoCustom;
import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;

@Repository
public class RoomRepoCustomImpl implements RoomRepoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Boolean isRoomAvailable(String roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<Room> root = query.from(Room.class);

        Join<Room, Reservation> reservationJoin = root.join("reservations", JoinType.LEFT);
        Predicate roomCondition = cb.equal(root.get("id"), roomId);
        Predicate statusCondition = cb.equal(root.get("status"), Status.ACTIVE.getValue());
        Predicate reservationStatusCondition = cb.equal(reservationJoin.get("status"), Status.ACTIVE.getValue());

        Predicate checkInOverlap = cb.and(
                cb.lessThanOrEqualTo(reservationJoin.get("checkInDate"), checkInDate),
                cb.greaterThan(reservationJoin.get("checkOutDate"), checkInDate)
        );

        Predicate checkOutOverlap = cb.and(
                cb.lessThan(reservationJoin.get("checkInDate"), checkOutDate),
                cb.greaterThanOrEqualTo(reservationJoin.get("checkOutDate"), checkOutDate)
        );

        Predicate dateCheck = cb.and(
                cb.equal(reservationJoin.get("checkInDate"), checkInDate),
                cb.equal(reservationJoin.get("checkOutDate"), checkOutDate)
        );

        Predicate dateOverlap = cb.or(checkInOverlap, checkOutOverlap, dateCheck);

        query.select(cb.count(root))
                .where(cb.and(roomCondition, statusCondition, reservationStatusCondition, dateOverlap));

        Long count = entityManager.createQuery(query).getSingleResult();
        return count == 0;
    }
}