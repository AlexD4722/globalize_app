package com.project.booking_platform.model;

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
@Table(name = "guests")
public class Guest {
    @Id
    @Column(name = "id", nullable = false, unique = true, columnDefinition = "NVARCHAR(12)")
    String id;

    @Column(name = "first_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String firstName;
    @Column(name = "last_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String lastName;
    @Column(name = "email", nullable = false, columnDefinition = "NVARCHAR(255)")
    String email;
    @Column(name = "user_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String username;
    @Column(name = "password", nullable = false, columnDefinition = "NVARCHAR(255)")
    String password;
    @Column(name = "id_number", nullable = false, columnDefinition = "NVARCHAR(255)")
    String idNumber;
    @Column(name = "phone_number", nullable = false, columnDefinition = "NVARCHAR(255)")
    String phoneNumber;
    @Column(name = "is_verified", nullable = false, columnDefinition = "BOOLEAN")
    Boolean isVerified;
    @Column(name = "verification_code", nullable = false, columnDefinition = "NVARCHAR(6)")
    String verificationCode;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    Status status;
    @Column(name = "last_modified_date", nullable = false)
    Date lastModifiedDate;
    @Column(name = "created_at", nullable = false)
    Date createdAt;

    @OneToMany(mappedBy = "guest")
    List<Reservation> reservations;
}