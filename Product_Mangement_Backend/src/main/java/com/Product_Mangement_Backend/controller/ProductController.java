package com.Product_Mangement_Backend.controller;

import com.Product_Mangement_Backend.model.Product;
import com.Product_Mangement_Backend.service.ProductServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {

    @Autowired
    private ProductServices productServices;

    @PostMapping("/saveProduct")
    public ResponseEntity<Product> saveProduct(@Valid @RequestBody Product product) {
        return new ResponseEntity<>(productServices.saveProduct(product), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<>(productServices.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllProductById(@PathVariable Integer id) {
        return new ResponseEntity<>(productServices.getAllProductById(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productServices.searchProducts(keyword);
    }

    @GetMapping(value = "/deleteProduct/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return new ResponseEntity<>(productServices.deleteProduct(id), HttpStatus.OK);
    }

    @PostMapping("/editProduct/{id}")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable int id) {
        return new ResponseEntity<>(productServices.editProduct(product, id), HttpStatus.CREATED);
    }
}