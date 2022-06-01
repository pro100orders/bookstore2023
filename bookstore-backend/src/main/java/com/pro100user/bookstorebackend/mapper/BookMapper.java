package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookDTO;
import com.pro100user.bookstorebackend.dto.BookListDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.Author;
import com.pro100user.bookstorebackend.entity.Book;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Mapper(uses = {AuthorMapper.class, CategoryMapper.class})
public interface BookMapper {

    @Mappings({
            @Mapping(source = "categoryId", target = "category.id")
    })
    Book toEntity(BookCreateDTO dto);
    @Mappings({
            @Mapping(source = "categoryId", target = "category.id")
    })
    Book toEntity(BookUpdateDTO dto);

    @Named("bookIsLike")
    default boolean bookIsLike(Book book, @Context List<Book> wishList) {
        if(wishList == null || wishList.isEmpty())
            return false;
        return wishList.contains(book);
    }

    @Mapping(source = "book", target = "isLike", qualifiedByName = "bookIsLike")
    BookDTO toBookDTO(Book book, @Context List<Book> wishList);
    @Mapping(source = "book", target = "isLike", qualifiedByName = "bookIsLike")
    BookListDTO toBookListDTO(Book book, @Context List<Book> wishList);
    @Mapping(target = "isLike", qualifiedByName = "bookIsLike")
    List<BookListDTO> toBookListDTO(List<Book> books, @Context List<Book> wishList);
}
