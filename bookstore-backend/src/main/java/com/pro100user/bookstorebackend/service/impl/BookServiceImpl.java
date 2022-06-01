package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.Book;
import com.pro100user.bookstorebackend.mapper.BookMapper;
import com.pro100user.bookstorebackend.repository.BookRepository;
import com.pro100user.bookstorebackend.repository.UserRepository;
import com.pro100user.bookstorebackend.security.UserSecurity;
import com.pro100user.bookstorebackend.service.BookService;
import com.pro100user.bookstorebackend.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    private final UserRepository userRepository;

    private final ImageService imageService;

    @Override
    public BookListDTO create(BookCreateDTO dto) {
        Book entity = bookMapper.toEntity(dto);
        return bookMapper.toBookListDTO(
                bookRepository.save(entity), null
        );
    }

    @Override
    public BookDTO getById(Long bookId, UserSecurity userSecurity) {
        return bookMapper.toBookDTO(
                bookRepository.findById(bookId).orElseThrow(),
                userSecurity == null ?
                        null
                        :
                        userRepository.findById(userSecurity.getId()).orElseThrow().getWishList()
        );
    }

    @Override
    public BookListDTO update(BookUpdateDTO dto) {
        Book entity = bookMapper.toEntity(dto);
        return bookMapper.toBookListDTO(
                bookRepository.save(entity), null
        );
    }

    @Override
    public boolean delete(Long bookId) {
        bookRepository.deleteById(bookId);
        return true;
    }

    @Override
    public List<BookListDTO> getAll(UserSecurity userSecurity) {
        return bookMapper.toBookListDTO(
                bookRepository.findAll(),
                userSecurity == null ?
                        null
                        :
                        userRepository.findById(userSecurity.getId()).orElseThrow().getWishList()
        );
    }

    @Override
    public BookListDTO setPhoto(MultipartFile file, Long bookId) {
        Book entity = bookRepository.findById(bookId).orElseThrow();
        entity.setImage(imageService.save(file, bookId));
        return bookMapper.toBookListDTO(
                bookRepository.save(entity), null
        );
    }

    @Override
    public boolean updatePhoto(MultipartFile file, Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        return imageService.update(book.getImage(), file);
    }

    @Override
    public boolean deletePhoto(Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        return imageService.delete(book.getImage());
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return bookRepository.getCount();
    }
    
    @Override
    public List<BookListDTO> getPageBooks(int page, int size, UserSecurity userSecurity) {
        List<Book> books = bookRepository.findAll();
        if(books.size() < --page * size) {
            throw new IllegalArgumentException("Нема такої кількості книг");
        }
        if(books.size() >= ++page * size) {
            books = books.subList((--page * size), (++page * size));
        }
        else {
            books = books.subList((--page * size), books.size());
        }
        return bookMapper.toBookListDTO(
                books,
                userSecurity == null ?
                        null
                        :
                        userRepository.findById(userSecurity.getId()).orElseThrow().getWishList()
        );
    }
}
