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
@Table(name = "administrative_regions")
public class AdministrativeRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name="name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name="name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String nameEn;
    @Column(name="code_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String codeName;
    @Column(name="code_name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String codeNameEn;

    @OneToMany(mappedBy = "administrativeRegion")
    List<Province> provinces;
}
