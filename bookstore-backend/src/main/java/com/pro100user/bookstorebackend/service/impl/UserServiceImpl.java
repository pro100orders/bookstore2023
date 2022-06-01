package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.*;
import com.pro100user.bookstorebackend.entity.Basket;
import com.pro100user.bookstorebackend.entity.Book;
import com.pro100user.bookstorebackend.entity.User;
import com.pro100user.bookstorebackend.entity.enums.Role;
import com.pro100user.bookstorebackend.mapper.BookMapper;
import com.pro100user.bookstorebackend.mapper.UserMapper;
import com.pro100user.bookstorebackend.repository.BasketRepository;
import com.pro100user.bookstorebackend.repository.BookRepository;
import com.pro100user.bookstorebackend.repository.UserRepository;
import com.pro100user.bookstorebackend.service.BasketService;
import com.pro100user.bookstorebackend.service.BookService;
import com.pro100user.bookstorebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    private final BookRepository bookRepository;
    private final BookService bookService;
    private final BookMapper bookMapper;

    private final BasketRepository basketRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if(findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        User entity = userMapper.toEntity(dto);
        entity.setRoles(List.of(Role.ROLE_USER));
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setEnabled(true);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getById(Long userId) {
        return userMapper.toUserDTO(
                userRepository.findById(userId).orElseThrow()
        );
    }

    @Override
    public UserDTO update(UserUpdateDTO dto) {
        User userDTO = userMapper.toEntity(dto);
        User entity = userRepository.findById(userDTO.getId()).orElseThrow();

        if(!entity.getEmail().equals(userDTO.getEmail()) && findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        if(entity.getPhone() != null && !entity.getPhone().equals(userDTO.getPhone()) && findByPhone(dto.getPhone()) != null) {
            throw new IllegalArgumentException("Цей номер вже зайнятий");
        }
        if(dto.getNewPassword() != null) {
            if(passwordEncoder.matches(entity.getPassword(), userDTO.getPassword())){
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
        entity = entity.toBuilder()
                .surname(userDTO.getSurname() == null ? entity.getSurname() : userDTO.getSurname())
                .name(userDTO.getName() == null ? entity.getName() : userDTO.getName())
                .email(userDTO.getEmail() == null ? entity.getEmail() : userDTO.getEmail())
                .phone(userDTO.getPhone() == null ? entity.getPhone() : userDTO.getPhone())
                .address(userDTO.getAddress() == null ? entity.getAddress() : userDTO.getAddress())
                .build();
        return userMapper.toUserDTO(
                userRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }

    @Override
    public List<UserDTO> getAll() {
        return userMapper.toUserDTO(
                userRepository.findAll()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).orElse(null);
    }


    @Override
    @Transactional(readOnly = true)
    public List<BookListDTO> getWishList(Long userId) {
        List<Book> books = userRepository.findById(userId).orElseThrow().getWishList();
        return bookMapper.toBookListDTO(
                books, books
        );
    }

    @Override
    public BookListDTO toggleWishList(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();
        if (user.getWishList().contains(book)) {
            user.getWishList().remove(book);
        } else {
            user.getWishList().add(book);
        }
        userRepository.save(user);
        return bookMapper.toBookListDTO(book, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookListDTO> getBasket(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return bookMapper.toBookListDTO(
                user.getBasket() == null ? new ArrayList<>() : user.getBasket().getBooks(),
                user.getWishList()
        );
    }

    @Override
    public BookListDTO toggleBasket(Long userId, Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if(user.getBasket() == null) {
            Basket basket = new Basket();
            basket.setUser(user);
            basket.setBooks(List.of(book));
            basket.setTotalPrice(book.getPrice());
            basketRepository.save(basket);
        }
        else {
            Basket basket = user.getBasket();
            if(basket.getBooks().contains(book)) {
                basket.getBooks().remove(book);
                basket.setTotalPrice(basket.getTotalPrice() - book.getPrice());
            }
            else {
                basket.getBooks().add(book);
                basket.setTotalPrice(basket.getTotalPrice() + book.getPrice());
            }
            basketRepository.save(basket);
        }
        return bookMapper.toBookListDTO(book, null);
    }
}
