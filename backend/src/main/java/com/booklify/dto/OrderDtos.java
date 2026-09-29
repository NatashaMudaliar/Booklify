package com.booklify.dto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
public final class OrderDtos {
  private OrderDtos() {}
  public record OrderItemRequest(@NotBlank String bookId,@Min(1) int quantity) {}
  public record CreateOrderRequest(@NotBlank String customerName,@Email @NotBlank String email,@NotEmpty List<@Valid OrderItemRequest> items) {}
}
