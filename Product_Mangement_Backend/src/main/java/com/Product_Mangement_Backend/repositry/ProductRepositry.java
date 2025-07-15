package com.Product_Mangement_Backend.repositry;

import com.Product_Mangement_Backend.model.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepositry extends JpaRepository<Product,Integer> {
    List<Product> findByProductNameContainingIgnoreCase(String keyword);
}
