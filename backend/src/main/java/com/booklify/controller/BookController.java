package com.booklify.controller;
import com.booklify.model.Book; import com.booklify.repository.BookRepository; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/books")
public class BookController {
  private final BookRepository repo; public BookController(BookRepository repo){this.repo=repo;}
  @GetMapping public List<Book> all(@RequestParam(required=false) String q,@RequestParam(required=false) String genre){
    if(q!=null&&!q.isBlank()) return repo.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(q,q);
    if(genre!=null&&!genre.isBlank()&&!genre.equalsIgnoreCase("All")) return repo.findByGenreIgnoreCase(genre);
    return repo.findAll();
  }
  @GetMapping("/{id}") public ResponseEntity<Book> one(@PathVariable String id){return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());}
}
