package com.Product_Mangement_Backend.service;

import com.Product_Mangement_Backend.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductServices {

    public Product saveProduct(Product product);

    public List<Product> getAllProduct();

    public Product getAllProductById(Integer id);

    public String deleteProduct(Integer id);

    public Product editProduct(Product product, int id);

    List<Product> searchProducts(String keyword);

}
