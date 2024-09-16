package com.project.booking_platform.dto.auth;

import com.project.booking_platform.utils.token_handling.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfo {
    public String username;
    public String password;
    public UserType type;
}
