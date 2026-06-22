package com.example.Libra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Libra.model.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}