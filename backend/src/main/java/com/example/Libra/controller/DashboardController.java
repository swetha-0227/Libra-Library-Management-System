package com.example.Libra.controller;

import com.example.Libra.services.BookService;
import com.example.Libra.services.IssueService;
import com.example.Libra.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {

    @Autowired
    private BookService bookService;

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBooks", bookService.getAll().size());
        stats.put("issued", issueService.getAllIssued().size());
        stats.put("overdue", issueService.getOverdue().size());
        return stats;
    }

    @GetMapping("/history")
    public List<Map<String, Object>> getHistory() {
        // Mock history data
        return List.of(
            Map.of("action", "Book Issued", "bookTitle", "Java Programming", "date", "2023-10-01", "status", "Issued"),
            Map.of("action", "Book Returned", "bookTitle", "Data Structures", "date", "2023-09-28", "status", "Returned", "dueSoon", false),
            Map.of("action", "Book Overdue", "bookTitle", "Algorithms", "date", "2023-09-25", "status", "Overdue", "dueSoon", false)
        );
    }
}