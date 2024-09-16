package com.project.booking_platform.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties({"property", "roomAttributeValues", "reservations", "amenityLists", "bedrooms"})
@Table(name = "rooms")
public class Room {
    @Id
    @Column(name = "id", nullable = false, unique = true, columnDefinition = "NVARCHAR(12)")
    String id;

    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "price", nullable = false)
    Float  price;
    @Column(name = "picture", nullable = false, columnDefinition = "NVARCHAR(255)")
    String picture;
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    String description;
    @Column(name = "max_guest", nullable = false)
    Integer maxGuest;
    @Column(name = "area", nullable = false)
    Float area;
    @Column(name = "floor", nullable = false)
    Integer floor;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    Property property;

    @OneToMany(mappedBy = "room")
    List<RoomAttributeValue> roomAttributeValues;
    @OneToMany(mappedBy = "room")
    List<Reservation> reservations;
    @OneToMany(mappedBy = "room")
    List<AmenityList> amenityLists;
    @OneToMany(mappedBy = "room")
    List<Bedroom> bedrooms;
}