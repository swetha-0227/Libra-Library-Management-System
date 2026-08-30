package com.example.Libra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.example.Libra.model.Category;
import com.example.Libra.repository.CategoryRepo;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo repo;

    public List<Category> getAllCategories() {
        return repo.findAll();
    }

    public Category saveCategory(Category category) {
        return repo.save(category);
    }

    public Category getById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    }
}