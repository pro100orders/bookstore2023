package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.*;

import java.util.List;

public interface AuthorService {

    AuthorDTO create(AuthorCreateDTO dto);
    AuthorDTO getById(Long authorId);
    AuthorDTO update(AuthorUpdateDTO dto);
    boolean delete(Long authorId);
    List<AuthorDTO> getAll();
}
