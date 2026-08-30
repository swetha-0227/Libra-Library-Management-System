package com.example.Libra.repository;

import com.example.Libra.model.IssueRecord;
import com.example.Libra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepo extends JpaRepository<IssueRecord, Long> {
    List<IssueRecord> findByReturnDateIsNull();
    List<IssueRecord> findByUser(User user);
}