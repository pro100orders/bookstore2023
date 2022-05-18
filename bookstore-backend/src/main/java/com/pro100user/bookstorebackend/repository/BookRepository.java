package com.pro100user.bookstorebackend.repository;

import com.pro100user.bookstorebackend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "SELECT COUNT(*) FROM books", nativeQuery = true)
    long getCount();
}
