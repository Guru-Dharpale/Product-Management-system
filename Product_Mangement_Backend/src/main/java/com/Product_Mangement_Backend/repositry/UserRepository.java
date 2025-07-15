package com.Product_Mangement_Backend.repositry;

import com.Product_Mangement_Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}