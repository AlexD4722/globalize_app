package com.project.booking_platform.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GuestDTO {
    String id;
    String firstName;
    String lastName;
    String email;
    String username;
    String phoneNumber;
    String idNumber;
    Boolean isVerified;
}
