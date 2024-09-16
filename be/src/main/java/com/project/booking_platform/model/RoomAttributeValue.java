package com.project.booking_platform.model;

import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "room_attribute_values")
public class RoomAttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @ManyToOne()
    @JoinColumn(name = "room_id")
    Room room;
    @ManyToOne
    @JoinColumn(name = "room_attribute_id")
    RoomAttribute roomAttribute;
    @ManyToOne
    @JoinColumn(name = "room_attribute_data_id")
    RoomAttributeData roomAttributeData;
}
