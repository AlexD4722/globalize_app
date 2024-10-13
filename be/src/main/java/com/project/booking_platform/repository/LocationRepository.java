package com.project.booking_platform.repository;

import com.project.booking_platform.model.District;
import com.project.booking_platform.model.Province;
import com.project.booking_platform.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Province, String> {
    @Query("select d from District d join d.province p where p.code = :provinceCode")
    List<District> findDistricts(String provinceCode);

    @Query("select w from Ward w join w.district d where d.code = :districtCode")
    List<Ward> findWards(String districtCode);

    @Query("select w from Ward w where w.code = :wardCode")
    Ward findWard(String wardCode);
}
