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
@JsonIgnoreProperties({"propertyAmenities", "lastModifiedDate", "createdAt", "status"})
@Table(name = "amenities")
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;
    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @ManyToOne
    @JoinColumn(name = "amenity_category_id", nullable = false)
    AmenityCategory amenityCategory;

    @OneToMany(mappedBy = "amenity", fetch = FetchType.LAZY)
    List<AmenityList> propertyAmenities;
}
