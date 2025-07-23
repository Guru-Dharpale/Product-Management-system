package com.Product_Mangement_Backend.service;

import com.Product_Mangement_Backend.model.Product;
import com.Product_Mangement_Backend.repositry.ProductRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.Product_Mangement_Backend.model.User;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductServices {
    @Autowired
    private ProductRepositry productRepositry;

    // @Override
    // public List<Product> getProductsByUser(User user) {
    //     return productRepositry.findByUser(user);
    // }

    @Override
    public Product saveProduct(Product product) {
        return productRepositry.save(product);
    }

    // @Override
    // public List<Product> searchProducts(String keyword) {
    //     return productRepositry.findByProductNameContainingIgnoreCase(keyword);
    // }

    // @Override
    // public List<Product> getAllProduct() {
    //     return productRepositry.findAll();
    // }

    @Override
    public Product getAllProductById(Integer id) {
        return productRepositry.findById(id).get();
    }

    @Override
    public String deleteProduct(Integer id) {
        productRepositry.deleteById(id);
        return "Product Deleted SuceessFully....!!!!";

    }

    @Override
    public Product editProduct(Product p, int id) {
        Product oldProduct = productRepositry.findById(id).get();
        oldProduct.setProductName(p.getProductName());
        oldProduct.setDescription(p.getDescription());
        oldProduct.setPrice(p.getPrice());
        oldProduct.setStatus(p.getStatus());
        return productRepositry.save(oldProduct);

    }

    @Override
    public Page<Product> getProductsByUser(User user, Pageable pageable) {
        return productRepositry.findByUser(user, pageable);
    }

    @Override
    public Page<Product> searchProducts(String keyword, User user, Pageable pageable) {
        return productRepositry.findByProductNameContainingIgnoreCaseAndUser(keyword, user, pageable);
    }

}
