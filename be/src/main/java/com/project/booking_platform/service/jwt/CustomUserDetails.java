package com.project.booking_platform.service.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
public class CustomUserDetails extends User implements UserDetails {
    private String id;
    private String actor;

    public CustomUserDetails(String id, String username, String password, String actor) {
        super(username, password, true, true, true, true, null);
        this.id = id;
        this.actor = actor;
    }

    public CustomUserDetails(UserDetails user) {
        super(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}
