package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.annotation.CurrentUser;
import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.enums.Language;
import com.pro100user.bookstorebackend.security.UserSecurity;
import com.pro100user.bookstorebackend.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("books")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookListDTO> books(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @CurrentUser UserSecurity userSecurity
    ) {
        return bookService.getAll(userSecurity, search);
    }

    @GetMapping("{id}")
    public BookDTO details(
            @PathVariable("id") Long id,
            @CurrentUser UserSecurity userSecurity
    ) {
        return bookService.getById(id, userSecurity);
    }

    @PostMapping
    public BookListDTO create(
            @RequestBody BookCreateDTO dto
    ) {
        return bookService.create(dto);
    }

    @PutMapping
    public BookListDTO update(
            @RequestBody BookUpdateDTO dto
    ) {
        return bookService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return bookService.delete(id);
    }


    @PostMapping("image/{id}")
    public BookListDTO setImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long bookId
    ) {
        return bookService.setImage(file, bookId);
    }

    @PutMapping("image/{id}")
    public boolean updateImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long bookId
    ) {
        return bookService.updateImage(file, bookId);
    }

    @DeleteMapping("image/{id}")
    public boolean deleteImage(
            @PathVariable("id") Long bookId
    ) {
        return bookService.deleteImage(bookId);
    }


    @GetMapping("count")
    public Map<String, Long> getCount() {
        return Map.of("count", bookService.getCount());
    }

    @GetMapping("languages")
    public List<String> languages() {
        return Arrays.stream(Language.values())
                .map(Language::name)
                .toList();
    }
}
