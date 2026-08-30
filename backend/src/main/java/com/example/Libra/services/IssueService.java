package com.example.Libra.services;

import java.time.LocalDate;
import java.util.List;

import com.example.Libra.model.Book;
import com.example.Libra.model.IssueRecord;
import com.example.Libra.model.User;
import com.example.Libra.repository.BookRepo;
import com.example.Libra.repository.IssueRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class IssueService {

    private final IssueRepo issueRepo;
    private final BookRepo bookRepo;

    public IssueService(IssueRepo issueRepo, BookRepo bookRepo) {
        this.issueRepo = issueRepo;
        this.bookRepo = bookRepo;
    }

    public IssueRecord issueBook(User user, Book book) {
        if (!book.isAvailable()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Book is already issued");
        }

        IssueRecord record = new IssueRecord();
        record.setUser(user);
        record.setBook(book);
        record.setIssueDate(LocalDate.now());
        record.setDueDate(LocalDate.now().plusDays(7));

        book.setAvailable(false);
        bookRepo.save(book);

        return issueRepo.save(record);
    }

    public List<IssueRecord> getAllIssued() {
        return issueRepo.findAll();
    }

    public IssueRecord returnBook(Long issueId) {
        IssueRecord record = issueRepo.findById(issueId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue record not found"));

        if (record.getReturnDate() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Book is already returned");
        }

        record.setReturnDate(LocalDate.now());
        Book book = record.getBook();
        book.setAvailable(true);
        bookRepo.save(book);

        return issueRepo.save(record);
    }

    public List<IssueRecord> getOverdue() {
        return issueRepo.findAll().stream()
            .filter(record -> record.getDueDate().isBefore(LocalDate.now()) && record.getReturnDate() == null)
            .toList();
    }

    public List<IssueRecord> getByUser(User user) {
        return issueRepo.findByUser(user);
    }
}
