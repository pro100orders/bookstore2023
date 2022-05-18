package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.*;
import com.pro100user.bookstorebackend.entity.User;

import java.util.List;

public interface UserService {

    boolean create(UserCreateDTO dto);
    UserDTO getById(Long userId);
    UserDTO update(UserUpdateDTO dto);
    boolean delete(Long userId);
    List<UserDTO> getAll();

    User findByEmail(String email);
    User findByPhone(String phone);

    List<BookListDTO> getWishList(Long id);
    BookListDTO toggleWishList(Long userId, Long bookId);
}
