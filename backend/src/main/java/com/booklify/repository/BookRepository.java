package com.booklify.repository;
import com.booklify.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface BookRepository extends MongoRepository<Book,String> {
  List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
  List<Book> findByGenreIgnoreCase(String genre);
}
