package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.AuthorCreateDTO;
import com.pro100user.bookstorebackend.dto.AuthorDTO;
import com.pro100user.bookstorebackend.dto.AuthorUpdateDTO;
import com.pro100user.bookstorebackend.entity.Author;
import com.pro100user.bookstorebackend.mapper.AuthorMapper;
import com.pro100user.bookstorebackend.repository.AuthorRepository;
import com.pro100user.bookstorebackend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Override
    public AuthorDTO create(AuthorCreateDTO dto) {
        if (authorRepository.findBySurnameAndName(dto.getSurname(), dto.getName()).isPresent())
            throw new IllegalArgumentException("Такий автор вже існує");
        Author entity = authorMapper.toEntity(dto);
        return authorMapper.toAuthorDTO(
                authorRepository.save(entity)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public AuthorDTO getById(Long authorId) {
        return authorMapper.toAuthorDTO(
                authorRepository.findById(authorId).orElseThrow()
        );
    }

    @Override
    public AuthorDTO update(AuthorUpdateDTO dto) {
        Author author = authorRepository.findById(dto.getId()).orElseThrow();
        if (authorRepository.findBySurnameAndName(dto.getSurname(), dto.getName()).isPresent() &&
                (!author.getSurname().equals(dto.getSurname()) || !author.getName().equals(dto.getName())))
            throw new IllegalArgumentException("Такий автор вже існує");
        Author entity = authorMapper.toEntity(dto);
        return authorMapper.toAuthorDTO(
                authorRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long authorId) {
        if (authorRepository.findById(authorId).orElseThrow().getBooks().isEmpty())
            throw new IllegalArgumentException("Ви не можете видалити цю категорію");
        authorRepository.deleteById(authorId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuthorDTO> getAll() {
        return authorMapper.toAuthorDTO(
                authorRepository.findAll()
        );
    }
}
