package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.annotation.CurrentUser;
import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.security.UserSecurity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BookService {

    BookListDTO create(BookCreateDTO dto);
    BookDTO getById(Long bookId, UserSecurity userSecurity);
    BookListDTO update(BookUpdateDTO dto);
    boolean delete(Long bookId);
    List<BookListDTO> getAll(UserSecurity userSecurity);

    BookListDTO setPhoto(MultipartFile file, Long bookId);
    boolean updatePhoto(MultipartFile file, Long bookId);
    boolean deletePhoto(Long bookId);

    long getCount();
    List<BookListDTO> getPageBooks(int page, int size, UserSecurity userSecurity);
}
