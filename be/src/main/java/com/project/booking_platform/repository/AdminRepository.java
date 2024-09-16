package com.project.booking_platform.repository;

import com.project.booking_platform.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByUserNameAndPassword(String userName, String password);
}
