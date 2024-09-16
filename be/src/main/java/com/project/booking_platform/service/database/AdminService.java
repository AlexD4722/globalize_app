package com.project.booking_platform.service.database;

import com.project.booking_platform.model.Admin;
import com.project.booking_platform.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> login(String username, String password) {
        return adminRepository.findByUserNameAndPassword(username, password);
    }
}
