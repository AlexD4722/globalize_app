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
@JsonIgnoreProperties({"administrativeUnit", "administrativeRegion", "districts"})
@Table(name = "provinces")
public class Province {
    @Id
    @Column(name = "code", nullable = false, unique = true, columnDefinition = "varchar(20)")
    String code;

    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String nameEn;
    @Column(name = "full_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;
    @Column(name = "full_name_en", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullNameEn;
    @Column(name = "code_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String codeName;

    @ManyToOne
    @JoinColumn(name = "administrative_unit_id", nullable = false)
    AdministrativeUnit administrativeUnit;
    @ManyToOne
    @JoinColumn(name = "administrative_region_id", nullable = false)
    AdministrativeRegion administrativeRegion;

    @OneToMany(mappedBy = "province")
    List<District> districts;
}
