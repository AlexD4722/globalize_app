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
@Table(name = "administrative_units")
public class AdministrativeUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "full_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;
    @Column(name = "full_name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullNameEn;
    @Column(name = "short_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String shortName;
    @Column(name = "short_name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String shortNameEn;
    @Column(name = "code_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String codeName;
    @Column(name = "code_name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String codeNameEn;

    @OneToMany(mappedBy = "administrativeUnit")
    List<Province> provinces;
    @OneToMany(mappedBy = "administrativeUnit")
    List<District> districts;
    @OneToMany(mappedBy = "administrativeUnit")
    List<Ward> wards;
}
