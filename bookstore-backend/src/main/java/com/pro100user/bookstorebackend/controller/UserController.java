package com.pro100user.bookstorebackend.controller;

import com.pro100user.bookstorebackend.annotation.CurrentUser;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.UserDTO;
import com.pro100user.bookstorebackend.dto.UserUpdateDTO;
import com.pro100user.bookstorebackend.mapper.UserMapper;
import com.pro100user.bookstorebackend.security.UserSecurity;
import com.pro100user.bookstorebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("user")
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public UserDTO profile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getById(userSecurity.getId());
    }

    @PutMapping("/profile")
    public UserDTO updateProfile(
            @RequestBody UserUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setId(userSecurity.getId());
        return userService.update(dto);
    }

    @DeleteMapping("/profile")
    public boolean deleteProfile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.delete(userSecurity.getId());
    }

    @GetMapping("/wish-list")
    public List<BookListDTO> wishList(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getWishList(userSecurity.getId());
    }

    @PostMapping("/wish-list")
    public BookListDTO toggleWishList(
            @CurrentUser UserSecurity userSecurity,
            @RequestBody Long bookId
    ) {
        return userService.toggleWishList(userSecurity.getId(), bookId);
    }

    @GetMapping("/basket")
    public List<BookListDTO> basket(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getBasket(userSecurity.getId());
    }

    @PostMapping("/basket")
    public BookListDTO toggleBasket(
            @CurrentUser UserSecurity userSecurity,
            @RequestBody Long bookId
    ) {
        return userService.toggleBasket(userSecurity.getId(), bookId);
    }
}
