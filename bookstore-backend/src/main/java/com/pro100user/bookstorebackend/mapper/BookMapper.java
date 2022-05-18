package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.Author;
import com.pro100user.bookstorebackend.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Mapper(uses = {AuthorMapper.class, CategoryMapper.class})
public interface BookMapper {

    @Named("authorsIdToAuthors")
    default List<Author> authorsIdToAuthors(List<Long> authorsId) {
        return authorsId.stream()
                .map(id -> {return Author.builder().id(id).build();})
                .collect(Collectors.toList());
    }

    @Mappings({
            @Mapping(source = "authorsId", target = "authors", qualifiedByName = "authorsIdToAuthors"),
            @Mapping(source = "categoryId", target = "category.id")
    })
    Book toEntity(BookCreateDTO dto);
    @Mappings({
            @Mapping(source = "authorsId", target = "authors", qualifiedByName = "authorsIdToAuthors"),
            @Mapping(source = "categoryId", target = "category.id")
    })
    Book toEntity(BookUpdateDTO dto);

    BookDTO toBookDTO(Book book);
    BookListDTO toBookListDTO(Book book);
    List<BookListDTO> toBookListDTO(List<Book> books);
}
