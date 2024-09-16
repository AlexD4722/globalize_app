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
@JsonIgnoreProperties({"propertyFacilities", "status", "lastModifiedDate", "createdAt"})
@Table(name = "facilitys")
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;
    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    String description;
    @Column(name = "fee", nullable = false )
    Float fee;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @OneToMany(mappedBy = "facility")
    List<PropertyFacility> propertyFacilities;
}