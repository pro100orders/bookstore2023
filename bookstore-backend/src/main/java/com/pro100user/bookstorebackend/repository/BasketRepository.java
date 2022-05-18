package com.pro100user.bookstorebackend.repository;

import com.pro100user.bookstorebackend.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
}
