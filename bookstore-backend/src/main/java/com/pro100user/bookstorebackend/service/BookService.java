package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.security.UserSecurity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    BookListDTO create(BookCreateDTO dto);
    BookDTO getById(Long bookId, UserSecurity userSecurity);
    BookListDTO update(BookUpdateDTO dto);
    boolean delete(Long bookId);
    List<BookListDTO> getAll(UserSecurity userSecurity, String search);

    BookListDTO setImage(MultipartFile file, Long productId);
    boolean updateImage(MultipartFile file, Long productId);
    boolean deleteImage(Long productId);

    long getCount();
}
