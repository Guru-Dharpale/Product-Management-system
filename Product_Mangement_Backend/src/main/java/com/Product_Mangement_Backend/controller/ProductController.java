package com.Product_Mangement_Backend.controller;

import com.Product_Mangement_Backend.model.Product;
import com.Product_Mangement_Backend.service.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import com.Product_Mangement_Backend.model.User;
import com.Product_Mangement_Backend.repositry.UserRepository;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductServices productServices;

    // Get all products for the logged-in user
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        List<Product> products = productServices.getProductsByUser(user);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Save a new product for the logged-in user
    @PostMapping("/save")
    public ResponseEntity<Product> saveProduct(@Valid @RequestBody Product product, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        product.setUser(user); // Set the owner
        return new ResponseEntity<>(productServices.saveProduct(product), HttpStatus.CREATED);
    }

    // Search products for the logged-in user
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        List<Product> products = productServices.searchProducts(keyword)
                .stream()
                .filter(p -> p.getUser().getId() == user.getId())
                .collect(Collectors.toList());
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get product by ID (optional: you may want to check user ownership here)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return new ResponseEntity<>(productServices.getAllProductById(id), HttpStatus.OK);
    }

    // Delete product by ID (optional: you may want to check user ownership here)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        productServices.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Edit product (optional: you may want to check user ownership here)
    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable int id) {
        return new ResponseEntity<>(productServices.editProduct(product, id), HttpStatus.OK);
    }
}