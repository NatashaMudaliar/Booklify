package com.booklify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class Book {
    @Id private String id;
    private String title; private String author; private double price; private String genre;
    private String emoji; private String description; private int stock;
    public Book() {}
    public Book(String id, String title, String author, double price, String genre, String emoji, String description, int stock) {
        this.id=id; this.title=title; this.author=author; this.price=price; this.genre=genre; this.emoji=emoji; this.description=description; this.stock=stock;
    }
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getTitle(){return title;} public void setTitle(String v){title=v;}
    public String getAuthor(){return author;} public void setAuthor(String v){author=v;}
    public double getPrice(){return price;} public void setPrice(double v){price=v;}
    public String getGenre(){return genre;} public void setGenre(String v){genre=v;}
    public String getEmoji(){return emoji;} public void setEmoji(String v){emoji=v;}
    public String getDescription(){return description;} public void setDescription(String v){description=v;}
    public int getStock(){return stock;} public void setStock(int v){stock=v;}
}
