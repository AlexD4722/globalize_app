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
@JsonIgnoreProperties({"bedroomDetails", "status", "lastModifiedDate", "createdAt"})
@Table(name = "bed_types")
public class BedType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;
    @Column(name = "name", nullable = false, unique = true)
    String name;
    @Column(name = "description", nullable = true)
    String description;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @OneToMany(mappedBy = "bedType")
    List<BedroomDetail> bedroomDetails;
}
