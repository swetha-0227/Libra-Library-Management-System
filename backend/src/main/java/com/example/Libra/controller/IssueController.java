package com.example.Libra.controller;

import com.example.Libra.model.Book;
import com.example.Libra.model.IssueRecord;
import com.example.Libra.model.User;
import com.example.Libra.services.BookService;
import com.example.Libra.services.IssueService;
import com.example.Libra.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/issue")
@CrossOrigin
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @PostMapping
    public IssueRecord issueBook(@RequestParam String username,
                                 @RequestParam Long bookId) {

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        Book book = bookService.getById(bookId);
        return issueService.issueBook(user, book);
    }

    @PostMapping("/return")
    public IssueRecord returnBook(@RequestParam Long issueId) {
        return issueService.returnBook(issueId);
    }

    @GetMapping
    public List<IssueRecord> getAllIssued() {
        return issueService.getAllIssued();
    }

    @GetMapping("/user")
    public List<IssueRecord> getUserIssued(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return issueService.getByUser(user);
    }
}
