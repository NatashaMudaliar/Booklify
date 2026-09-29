package com.booklify.repository;
import com.booklify.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface ContactMessageRepository extends MongoRepository<ContactMessage,String> {}
