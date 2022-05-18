package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.Book;
import com.pro100user.bookstorebackend.mapper.BookMapper;
import com.pro100user.bookstorebackend.repository.BookRepository;
import com.pro100user.bookstorebackend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Override
    public BookListDTO create(BookCreateDTO dto) {
        Book entity = bookMapper.toEntity(dto);
        return bookMapper.toBookListDTO(
                bookRepository.save(entity)
        );
    }

    @Override
    public BookDTO getById(Long id) {
        return bookMapper.toBookDTO(
                bookRepository.findById(id).orElseThrow()
        );
    }

    @Override
    public BookListDTO update(BookUpdateDTO dto) {
        Book entity = bookMapper.toEntity(dto);
        return bookMapper.toBookListDTO(
                bookRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long id) {
        bookRepository.deleteById(id);
        return true;
    }

    @Override
    public List<BookListDTO> getAll() {
        return bookMapper.toBookListDTO(
                bookRepository.findAll()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return bookRepository.getCount();
    }
    @Override
    public List<BookListDTO> getPageBooks(int page, int size) {
        return null;
    }

    @Override
    public List<BookListDTO> searchBooks(int page, int size, String search) {
        return null;
    }

    @Override
    public List<BookListDTO> getListBookByCategoryName(String name) {
        return null;
    }
}
