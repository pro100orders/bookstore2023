package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.AuthorCreateDTO;
import com.pro100user.bookstorebackend.dto.AuthorDTO;
import com.pro100user.bookstorebackend.dto.AuthorUpdateDTO;
import com.pro100user.bookstorebackend.entity.Author;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface AuthorMapper {

    Author toEntity(AuthorCreateDTO dto);
    Author toEntity(AuthorUpdateDTO dto);

    AuthorDTO toAuthorDTO(Author author);
    List<AuthorDTO> toAuthorDTO(List<Author> authors);
}
