package com.pro100user.bookstorebackend.repository;

import com.pro100user.bookstorebackend.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
}
