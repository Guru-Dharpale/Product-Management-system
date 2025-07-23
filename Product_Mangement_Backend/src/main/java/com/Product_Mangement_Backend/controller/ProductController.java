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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductServices productServices;

    // Get all products for the logged-in user (paginated + sorted)
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> products = productServices.getProductsByUser(user, PageRequest.of(page, size, sort));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Search products for the logged-in user (paginated + sorted)
    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> products = productServices.searchProducts(keyword, user, PageRequest.of(page, size, sort));
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

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return new ResponseEntity<>(productServices.getAllProductById(id), HttpStatus.OK);
    }

    // Delete product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        productServices.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Edit product
    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable int id) {
        return new ResponseEntity<>(productServices.editProduct(product, id), HttpStatus.OK);
    }
}