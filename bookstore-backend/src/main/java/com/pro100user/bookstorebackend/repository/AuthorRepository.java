package com.pro100user.bookstorebackend.repository;

import com.pro100user.bookstorebackend.entity.Author;
import com.pro100user.bookstorebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    @Query(value = "SELECT * FROM authors WHERE surname = :surname AND name = :name", nativeQuery = true)
    Optional<Author> findBySurnameAndName(@Param("surname") String surname, @Param("name") String name);
}
