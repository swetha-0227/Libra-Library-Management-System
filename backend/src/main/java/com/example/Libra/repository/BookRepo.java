package com.example.Libra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Libra.model.Book;

public interface BookRepo extends JpaRepository<Book, Long> {}