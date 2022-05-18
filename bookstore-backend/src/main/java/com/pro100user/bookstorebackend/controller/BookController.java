package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.enums.Language;
import com.pro100user.bookstorebackend.entity.enums.Type;
import com.pro100user.bookstorebackend.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("books")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookListDTO> books(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int size,
            @RequestParam(required = false) String search
    ) {
        return bookService.getPageBooks(page, size);
    }

    @GetMapping("{id}")
    public BookDTO details(
            @PathVariable("id") Long id
    ) {
        return bookService.getById(id);
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


    @GetMapping("count")
    public Map<String, Long> getCount() {
        return Map.of("count", bookService.getCount());
    }

    @GetMapping("languages")
    public List<String> languages() {
        return Arrays.stream(Language.values())
                .map(type -> type.name())
                .collect(Collectors.toList());
    }

    @GetMapping("types")
    public List<String> types() {
        return Arrays.stream(Type.values())
                .map(type -> type.name())
                .collect(Collectors.toList());
    }
}
