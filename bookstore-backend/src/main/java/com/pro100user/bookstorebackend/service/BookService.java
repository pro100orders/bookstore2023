package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;

import java.util.List;

public interface BookService {

    BookListDTO create(BookCreateDTO dto);
    BookDTO getById(Long bookId);
    BookListDTO update(BookUpdateDTO dto);
    boolean delete(Long bookId);
    List<BookListDTO> getAll();


    long getCount();
    List<BookListDTO> getPageBooks(int page, int size);
    List<BookListDTO> searchBooks(int page, int size, String search);
    List<BookListDTO> getListBookByCategoryName(String name);
}
