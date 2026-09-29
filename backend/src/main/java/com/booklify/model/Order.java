package com.booklify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant; import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id private String id; private String userId; private String customerName; private String email; private List<Item> items;
    private double subtotal; private double delivery; private double total; private Instant createdAt; private String status;
    public Order() {}
    public Order(String id,String userId,String customerName,String email,List<Item> items,double subtotal,double delivery,double total,Instant createdAt,String status){
        this.id=id;this.userId=userId;this.customerName=customerName;this.email=email;this.items=items;this.subtotal=subtotal;this.delivery=delivery;this.total=total;this.createdAt=createdAt;this.status=status;
    }
    public String getId(){return id;} public void setId(String v){id=v;} public String getUserId(){return userId;} public void setUserId(String v){userId=v;}
    public String getCustomerName(){return customerName;} public void setCustomerName(String v){customerName=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;}
    public List<Item> getItems(){return items;} public void setItems(List<Item> v){items=v;} public double getSubtotal(){return subtotal;} public void setSubtotal(double v){subtotal=v;}
    public double getDelivery(){return delivery;} public void setDelivery(double v){delivery=v;} public double getTotal(){return total;} public void setTotal(double v){total=v;}
    public Instant getCreatedAt(){return createdAt;} public void setCreatedAt(Instant v){createdAt=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
    public static class Item {
        private String bookId; private String title; private double price; private int quantity;
        public Item() {} public Item(String bookId,String title,double price,int quantity){this.bookId=bookId;this.title=title;this.price=price;this.quantity=quantity;}
        public String getBookId(){return bookId;} public void setBookId(String v){bookId=v;} public String getTitle(){return title;} public void setTitle(String v){title=v;}
        public double getPrice(){return price;} public void setPrice(double v){price=v;} public int getQuantity(){return quantity;} public void setQuantity(int v){quantity=v;}
    }
}
