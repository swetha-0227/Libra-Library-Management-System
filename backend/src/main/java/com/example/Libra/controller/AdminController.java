package com.example.Libra.controller;

import com.example.Libra.model.User;
import com.example.Libra.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserService userService;

    // ✅ Get all users (ADMIN only)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Add new user (Admin / Librarian / User)
    @PostMapping("/add-user")
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // ✅ Delete user
    @DeleteMapping("/delete-user/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

    // ✅ Update role (Promote to Librarian / Admin)
    @PutMapping("/update-role")
    public User updateRole(@RequestParam Long userId,
                           @RequestParam String role) {

        return userService.updateRole(userId, role);
    }

    // ✅ Get activity logs
    @GetMapping("/logs")
    public List<String> getActivityLogs() {
        // Mock logs for now
        return List.of("Book added: Java Programming", "User logged in: admin", "Book issued: Data Structures");
    }
}