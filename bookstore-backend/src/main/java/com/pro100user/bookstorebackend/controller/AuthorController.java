package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.dto.*;
import com.pro100user.bookstorebackend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("authors")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping
    public List<AuthorDTO> authors() {
        return authorService.getAll();
    }

    @GetMapping("{id}")
    public AuthorDTO details(
            @PathVariable("id") Long authorId
    ) {
        return authorService.getById(authorId);
    }

    @PostMapping
    public AuthorDTO create(
            @RequestBody AuthorCreateDTO dto
    ) {
        return authorService.create(dto);
    }

    @PutMapping
    public AuthorDTO update(
            @RequestBody AuthorUpdateDTO dto
    ) {
        return authorService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long authorId
    ) {
        return authorService.delete(authorId);
    }
}
