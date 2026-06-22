package com.example.Libra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Libra.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByUsername(String username);  // ✅ VERY IMPORTANT
}