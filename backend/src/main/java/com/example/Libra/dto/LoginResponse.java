package com.example.Libra.dto;

public class LoginResponse {

    private String token;
    private String role;

    // ✅ Constructor
    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // ✅ Getter - token
    public String getToken() {
        return token;
    }

    // ✅ Getter - role
    public String getRole() {
        return role;
    }

    // ✅ Setter - token
    public void setToken(String token) {
        this.token = token;
    }

    // ✅ Setter - role
    public void setRole(String role) {
        this.role = role;
    }
}