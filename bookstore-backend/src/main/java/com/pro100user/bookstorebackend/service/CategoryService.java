package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.CategoryCreateDTO;
import com.pro100user.bookstorebackend.dto.CategoryDTO;
import com.pro100user.bookstorebackend.dto.CategoryUpdateDTO;

import java.util.List;

public interface CategoryService {

    CategoryDTO create(CategoryCreateDTO dto);
    CategoryDTO getById(Long categoryId);
    CategoryDTO update(CategoryUpdateDTO dto);
    boolean delete(Long categoryId);
    List<CategoryDTO> getAll();
}
