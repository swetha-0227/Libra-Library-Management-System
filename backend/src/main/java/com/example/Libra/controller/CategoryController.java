package com.example.Libra.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Libra.model.Category;
import com.example.Libra.services.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService service;
@GetMapping
public List<Category> getAllCategories() {
    return service.getAllCategories(); // ✅ FIXED
}

@PostMapping
public Category addCategory(@RequestBody Category category) {
    return service.saveCategory(category); // ✅ FIXED
}
}