package com.booklify.controller;
import com.booklify.dto.ContactDtos.ContactRequest; import com.booklify.model.ContactMessage; import com.booklify.repository.ContactMessageRepository; import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.time.Instant; import java.util.Map;
@RestController @RequestMapping("/api/contact")
public class ContactController {
  private final ContactMessageRepository repo; public ContactController(ContactMessageRepository repo){this.repo=repo;}
  @PostMapping public ResponseEntity<?> send(@Valid @RequestBody ContactRequest r){repo.save(new ContactMessage(null, r.name(), r.email(), r.message(), Instant.now()));return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","Your message has been received."));}
}
