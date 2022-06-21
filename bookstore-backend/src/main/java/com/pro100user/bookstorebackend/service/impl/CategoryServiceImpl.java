package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.CategoryCreateDTO;
import com.pro100user.bookstorebackend.dto.CategoryDTO;
import com.pro100user.bookstorebackend.dto.CategoryUpdateDTO;
import com.pro100user.bookstorebackend.entity.Category;
import com.pro100user.bookstorebackend.mapper.CategoryMapper;
import com.pro100user.bookstorebackend.repository.CategoryRepository;
import com.pro100user.bookstorebackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO create(CategoryCreateDTO dto) {
        Category entity = categoryMapper.toEntity(dto);
        if (categoryRepository.findByName(entity.getName()).isPresent())
            throw new IllegalArgumentException("Ця назва категорії вже зайнята");
        return categoryMapper.toCategoryDTO(
                categoryRepository.save(entity)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDTO getById(Long categoryId) {
        return categoryMapper.toCategoryDTO(
                categoryRepository.findById(categoryId).orElseThrow()
        );
    }

    @Override
    public CategoryDTO update(CategoryUpdateDTO dto) {
        Category category = categoryRepository.findByName(dto.getName()).orElse(null);
        if (category != null && !category.getId().equals(dto.getId()))
            throw new IllegalArgumentException("Ця назва категорії вже зайнята");
        Category entity = categoryMapper.toEntity(dto);
        return categoryMapper.toCategoryDTO(
                categoryRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long categoryId) {
        if (!categoryRepository.findById(categoryId).orElseThrow().getBooks().isEmpty())
            throw new IllegalArgumentException("Ви не можете видалити цю категорію");
        categoryRepository.deleteById(categoryId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAll() {
        return categoryMapper.toCategoryDTO(
                categoryRepository.findAll()
        );
    }
}
