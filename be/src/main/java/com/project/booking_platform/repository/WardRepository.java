package com.project.booking_platform.repository;

import com.project.booking_platform.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WardRepository extends JpaRepository<Ward, String> {
}
