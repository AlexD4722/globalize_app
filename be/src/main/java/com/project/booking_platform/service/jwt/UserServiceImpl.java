package com.project.booking_platform.service.jwt;

import com.project.booking_platform.model.Admin;
import com.project.booking_platform.model.Guest;
import com.project.booking_platform.model.Owner;
import com.project.booking_platform.repository.AdminRepository;
import com.project.booking_platform.repository.GuestRepository;
import com.project.booking_platform.repository.OwnerRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService {

    private final GuestRepository guestRepository;
    private final OwnerRepository ownerRepository;
    private final AdminRepository adminRepository;

    public UserServiceImpl(GuestRepository guestRepository, OwnerRepository ownerRepository, AdminRepository adminRepository) {
        this.guestRepository = guestRepository;
        this.ownerRepository = ownerRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Guest g = guestRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));
        return User.builder().username(g.getUsername()).password(g.getPassword())
                .roles("guest").build();
    }

    public CustomUserDetails loadUserById(String id, String actor) throws UsernameNotFoundException {
        CustomUserDetails userDetails = switch (actor) {
            case "guest" -> {
                Guest g = guestRepository.findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
                yield new CustomUserDetails(User.builder().username(g.getUsername()).password(g.getPassword())
                        .roles("GUEST").build());
            }
            case "owner" -> {
                Owner o = ownerRepository.findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
                yield new CustomUserDetails(User.builder().username(o.getUserName()).password(o.getPassword())
                        .roles("OWNER").build());
            }
            case "admin" -> {
                Admin a = adminRepository.findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
                yield new CustomUserDetails(User.builder().username(a.getUserName()).password(a.getPassword())
                        .roles("ADMIN").build());
            }
            default -> throw new UsernameNotFoundException("Invalid actor: " + actor);
        };
        userDetails.setId(id);
        userDetails.setActor(actor);
        return userDetails;
    }
}
