package com.booklify.dto;
import jakarta.validation.constraints.*;
public final class ContactDtos {
  private ContactDtos() {}
  public record ContactRequest(@NotBlank String name,@Email @NotBlank String email,@NotBlank @Size(min=10,max=2000) String message) {}
}
