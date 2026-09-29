package com.booklify.controller;
import com.booklify.dto.AuthDtos.*; import com.booklify.model.User; import com.booklify.repository.UserRepository; import com.booklify.security.JwtService; import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
  public AuthController(UserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}
  @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r){
    if(users.existsByEmailIgnoreCase(r.email())) return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
    User u=users.save(new User(null, r.name().trim(), r.email().trim().toLowerCase(), encoder.encode(r.password())));
    return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(jwt.generate(u.getId(),u.getEmail()),u.getName(),u.getEmail()));
  }
  @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){
    var u=users.findByEmailIgnoreCase(r.email()).orElse(null);
    if(u==null||!encoder.matches(r.password(),u.getPasswordHash())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    return ResponseEntity.ok(new AuthResponse(jwt.generate(u.getId(),u.getEmail()),u.getName(),u.getEmail()));
  }
}
