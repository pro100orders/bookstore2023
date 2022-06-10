package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.OrderDTO;
import com.pro100user.bookstorebackend.dto.OrderUpdateDTO;
import com.pro100user.bookstorebackend.service.BookService;
import com.pro100user.bookstorebackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("admin")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

    public final OrderService orderService;
    public final BookService bookService;

    @GetMapping("/orders")
    public List<OrderDTO> orders() {
        return orderService.getAll().stream()
                .sorted(Comparator.comparing(OrderDTO::getCreatedAt).reversed())
                .toList();
    }

    @PutMapping("/orders")
    public OrderDTO orders(
            @Valid @RequestBody OrderUpdateDTO dto
    ) {
        return orderService.update(dto);
    }

    @DeleteMapping("/orders/{id}")
    public boolean deleteOrder(
            @PathVariable("id") Long id
    ) {
        return orderService.delete(id);
    }

    @GetMapping("/books")
    public List<BookListDTO> booksToOrder() {
        return bookService.getAll(null, "").stream()
                .filter(book -> book.getAmount() <= 50)
                .toList();
    }
}
