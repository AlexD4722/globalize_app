package com.project.booking_platform.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties({"status", "lastModifiedDate", "createdAt", "comments", "invoice", "guest"})
@Table(name = "reservations")
public class Reservation {
    @Id
    @Column(name = "id", nullable = false, unique = true, columnDefinition = "NVARCHAR(12)")
    String id;

    @Column(name = "check_in_date", nullable = false)
    LocalDate checkInDate;
    @Column(name = "check_out_date", nullable = false)
    LocalDate checkOutDate;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @ManyToOne()
    @JoinColumn(name = "room_id", nullable = false)
    Room room;
    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = false)
    Guest guest;

    @OneToMany(mappedBy = "reservation")
    List<Comment> comments;
    @OneToOne(mappedBy = "reservation")
    Invoice invoice;
}
