package com.booklify.controller;

import com.booklify.repository.BookRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    private final BookRepository books;
    public HealthController(BookRepository books) { this.books = books; }

    @GetMapping
    public Map<String, Object> health() {
        return Map.of("status", "UP", "books", books.count());
    }
}
