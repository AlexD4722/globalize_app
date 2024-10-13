package com.project.booking_platform.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.booking_platform.utils.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties({"property", "status", "lastModifiedDate", "createdAt"})
@Table(name = "property_common_rules")
public class PropertyCommonRule {
    @Id
    @Column(name = "id", nullable = false, unique = true, columnDefinition = "NVARCHAR(12)")
    String id;

    @Column(name = "check_in_time", nullable = false)
    LocalTime checkInTime;
    @Column(name = "check_out_time", nullable = false)
    LocalTime checkOutTime;
    @Column(name = "quiet_time_from", nullable = false)
    LocalTime quietTimeFrom;
    @Column(name = "quiet_time_to", nullable = false)
    LocalTime quietTimeTo;
    @Column(name = "minimum_allowed_age", nullable = false)
    int minimumAllowedAge;
    @Column(name = "is_smoking_allowed", nullable = false)
    boolean isSmokingAllowed;
    @Column(name = "is_pet_allowed", nullable = false)
    boolean isPetAllowed;
    @Column(name = "is_party_allowed", nullable = false)
    boolean isPartyAllowed;
    @Column(name = "cancel_before_hour", nullable = false)
    int cancelBeforeHour;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @OneToOne
    @JoinColumn(name = "property_id", nullable = false)
    Property property;
}
