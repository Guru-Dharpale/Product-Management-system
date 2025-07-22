package com.Product_Mangement_Backend.model;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import com.Product_Mangement_Backend.model.User;

@Entity
public class Product {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Product_ID")
    private int id;
    @NotBlank(message = "Product Name Cannot Be Empty")
    @Column(name = "Product_Name")
    private String productName;
    private String description;
    @PositiveOrZero(message = "price must be zero or positive")
    @Column(name = "Product_Price")
    private Double price;
    @Column(name = "Product_Status")
    private String status;

    public Product() {
        super();
    }

    public Product(int id, String productName, String description, Double price, String status) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", status='" + status + '\'' +

                '}';
    }
}
