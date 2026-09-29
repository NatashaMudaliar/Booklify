package com.booklify.controller;
import com.booklify.dto.OrderDtos.*; import com.booklify.model.Order; import com.booklify.repository.*; import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.time.Instant; import java.util.*;
@RestController @RequestMapping("/api/orders")
public class OrderController {
  private final OrderRepository orders; private final BookRepository books; private final UserRepository users;
  public OrderController(OrderRepository orders,BookRepository books,UserRepository users){this.orders=orders;this.books=books;this.users=users;}
  @PostMapping public ResponseEntity<?> create(@Valid @RequestBody CreateOrderRequest r, Authentication auth){
    List<Order.Item> items=new ArrayList<>(); double subtotal=0;
    for(var req:r.items()){
      var b=books.findById(req.bookId()).orElse(null); if(b==null) return ResponseEntity.badRequest().body("Book not found: "+req.bookId());
      if(b.getStock()<req.quantity()) return ResponseEntity.badRequest().body("Insufficient stock for: "+b.getTitle());
      items.add(new Order.Item(b.getId(), b.getTitle(), b.getPrice(), req.quantity())); subtotal+=b.getPrice()*req.quantity(); b.setStock(b.getStock()-req.quantity()); books.save(b);
    }
    double delivery=subtotal>=999?0:49; Order o=new Order(null, (String)auth.getPrincipal(), r.customerName(), r.email(), items, subtotal, delivery, subtotal + delivery, Instant.now(), "PLACED");
    return ResponseEntity.status(HttpStatus.CREATED).body(orders.save(o));
  }
  @GetMapping public List<Order> mine(Authentication auth){return orders.findByUserIdOrderByCreatedAtDesc((String)auth.getPrincipal());}
}
