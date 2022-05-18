package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.*;
import com.pro100user.bookstorebackend.entity.Book;
import com.pro100user.bookstorebackend.entity.User;
import com.pro100user.bookstorebackend.entity.enums.Role;
import com.pro100user.bookstorebackend.mapper.BookMapper;
import com.pro100user.bookstorebackend.mapper.UserMapper;
import com.pro100user.bookstorebackend.repository.BookRepository;
import com.pro100user.bookstorebackend.repository.UserRepository;
import com.pro100user.bookstorebackend.service.BookService;
import com.pro100user.bookstorebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    private final BookRepository bookRepository;
    private final BookService bookService;
    private final BookMapper bookMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if(findByEmail(dto.getEmail()) != null) {
            throw new BadCredentialsException("email");
        }
        if(findByPhone(dto.getPhone()) != null) {
            throw new BadCredentialsException("phone");
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
        User entity = userMapper.toEntity(dto);
        User user = userRepository.findById(entity.getId()).orElseThrow();

        if(!user.getEmail().equals(entity.getEmail()) && findByEmail(dto.getEmail()) != null) {
            throw new BadCredentialsException("email");
        }
        if(!user.getPhone().equals(entity.getPhone()) && findByPhone(dto.getPhone()) != null) {
            throw new BadCredentialsException("phone");
        }
        if(dto.getNewPassword() != null) {
            if(passwordEncoder.matches(user.getPassword(), entity.getPassword())){
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
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
        return userRepository.findByEmail(email).orElseThrow();
    }

    @Override
    @Transactional(readOnly = true)
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).orElseThrow();
    }


    @Override
    @Transactional(readOnly = true)
    public List<BookListDTO> getWishList(Long id) {
        return bookMapper.toBookListDTO(
            userRepository.findById(id).orElseThrow().getWishList()
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
        return bookMapper.toBookListDTO(book);
    }
}
