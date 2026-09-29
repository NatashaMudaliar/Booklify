package com.booklify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "contact_messages")
public class ContactMessage {
    @Id private String id; private String name; private String email; private String message; private Instant createdAt;
    public ContactMessage() {}
    public ContactMessage(String id,String name,String email,String message,Instant createdAt){this.id=id;this.name=name;this.email=email;this.message=message;this.createdAt=createdAt;}
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;}
    public String getMessage(){return message;} public void setMessage(String v){message=v;}
    public Instant getCreatedAt(){return createdAt;} public void setCreatedAt(Instant v){createdAt=v;}
}
