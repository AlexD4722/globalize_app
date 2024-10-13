package com.project.booking_platform.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties({"propertyCommonRules", "rooms", "propertyFacilities", "owner", "ward"})
@Table(name = "properties")
public class Property {
    @Id
    @Column(name = "id", nullable = false, unique = true, columnDefinition = "NVARCHAR(12)")
    String id;

    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    String description;
    @Column(name = "address_specific", nullable = false, columnDefinition = "NVARCHAR(255)")
    String addressSpecific;
    @Column(name = "location_gps", columnDefinition = "NVARCHAR(255)")
    String locationGps;
    @Column(name = "picture", columnDefinition = "NVARCHAR(255)")
    String picture;
    @Column(name = "refund_percent", nullable = false)
    int refundPercent;
    @Column(name="refund_allowed_days", nullable = false)
    int refundAllowedDays;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @OneToOne(mappedBy = "property")
    PropertyCommonRule  propertyCommonRules;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    Owner owner;
    @ManyToOne
    @JoinColumn(name = "ward_code", nullable = false)
    Ward ward;

    @OneToMany(mappedBy = "property")
    List<Room> rooms;
    @OneToMany(mappedBy = "property")
    List<PropertyFacility> propertyFacilities;
}