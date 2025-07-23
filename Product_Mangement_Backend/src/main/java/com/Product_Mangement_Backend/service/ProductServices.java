package com.Product_Mangement_Backend.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.Product_Mangement_Backend.model.Product;
import com.Product_Mangement_Backend.model.User;

public interface ProductServices {

    Product saveProduct(Product product);

    Page<Product> getProductsByUser(User user, Pageable pageable);

    Page<Product> searchProducts(String keyword, User user, Pageable pageable);

    Product getAllProductById(Integer id);

    String deleteProduct(Integer id);

    Product editProduct(Product product, int id);

    // Remove the old List-based methods!
}