package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.BasketDTO;
import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;

import java.util.List;

public interface BasketService {

    BasketDTO create(BookCreateDTO dto);
    BasketDTO getById(Long basketId);
    BasketDTO update(BookUpdateDTO dto);
    boolean delete(Long basketId);
    List<BasketDTO> getAll();
}
