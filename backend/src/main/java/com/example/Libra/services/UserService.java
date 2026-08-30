package com.example.Libra.services;

import java.util.List;

import com.example.Libra.model.User;
import com.example.Libra.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User saveUser(User user) {
        if (user.getPassword() != null && !user.getPassword().startsWith("$2")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repo.save(user);
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    public User updateRole(Long userId, String role) {
        User user = repo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(User.Role.valueOf(role.toUpperCase()));
        return repo.save(user);
    }
}
