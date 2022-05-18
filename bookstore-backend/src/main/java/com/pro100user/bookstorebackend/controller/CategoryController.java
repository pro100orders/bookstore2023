package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.dto.CategoryCreateDTO;
import com.pro100user.bookstorebackend.dto.CategoryDTO;
import com.pro100user.bookstorebackend.dto.CategoryUpdateDTO;
import com.pro100user.bookstorebackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("categories")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> categories() {
        return categoryService.getAll();
    }

    @GetMapping("{id}")
    public CategoryDTO details(
            @PathVariable("id") Long id
    ) {
        return categoryService.getById(id);
    }

    @PostMapping
    public CategoryDTO create(
            @RequestBody CategoryCreateDTO dto
    ) {
        return categoryService.create(dto);
    }

    @PutMapping
    public CategoryDTO update(
            @RequestBody CategoryUpdateDTO dto
    ) {
        return categoryService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return categoryService.delete(id);
    }
}
