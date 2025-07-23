package com.Product_Mangement_Backend.repositry;

import com.Product_Mangement_Backend.model.Product;

import java.util.List;

// import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Product_Mangement_Backend.model.User;

@Repository
public interface ProductRepositry extends JpaRepository<Product, Integer> {
    List<Product> findByProductNameContainingIgnoreCase(String keyword);

    List<Product> findByUser(User user);

    Page<Product> findByUser(User user, Pageable pageable);

    Page<Product>  findByProductNameContainingIgnoreCaseAndUser(String keyword, User user, Pageable pageable);
}
