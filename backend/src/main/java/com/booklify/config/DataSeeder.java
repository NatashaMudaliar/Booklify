package com.booklify.config;

import com.booklify.model.Book;
import com.booklify.model.User;
import com.booklify.repository.BookRepository;
import com.booklify.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(BookRepository books, UserRepository users, PasswordEncoder encoder) {
        return args -> {
            // Seed the catalog if it is empty.
            if (books.count() == 0) {
                books.saveAll(List.of(
                    book("The Alchemist", "Paulo Coelho", 399, "Fiction", "📖", "A timeless story about following dreams and finding purpose.", 20),
                    book("Atomic Habits", "James Clear", 499, "Self Help", "📘", "A practical framework for building good habits and breaking bad ones.", 18),
                    book("Clean Code", "Robert C. Martin", 699, "Technology", "💻", "Principles and practices for writing readable, maintainable software.", 12),
                    book("The Psychology of Money", "Morgan Housel", 449, "Finance", "💰", "Timeless lessons on wealth, behavior and financial decisions.", 16),
                    book("Ikigai", "Héctor García", 349, "Self Help", "🌱", "Ideas from Japan about purpose, longevity and everyday meaning.", 25),
                    book("Harry Potter", "J. K. Rowling", 599, "Fantasy", "🪄", "A magical coming-of-age adventure at Hogwarts.", 14),
                    book("Rich Dad Poor Dad", "Robert Kiyosaki", 429, "Finance", "📈", "A popular personal-finance book about money and financial literacy.", 19),
                    book("The Pragmatic Programmer", "David Thomas", 799, "Technology", "👨‍💻", "Practical software engineering lessons for building better systems.", 10)
                ));
                System.out.println("Booklify: seeded 8 books into MongoDB.");
            }

            // Create a ready-to-use demo account so login can be tested immediately.
            String demoEmail = "demo@booklify.com";
            if (!users.existsByEmailIgnoreCase(demoEmail)) {
                users.save(new User(
                    null,
                    "Booklify Demo",
                    demoEmail,
                    encoder.encode("Booklify@123")
                ));
                System.out.println("Booklify: created demo account demo@booklify.com.");
            }
        };
    }

    private Book book(String title, String author, double price, String genre,
                      String emoji, String description, int stock) {
        return new Book(null, title, author, price, genre, emoji, description, stock);
    }
}
