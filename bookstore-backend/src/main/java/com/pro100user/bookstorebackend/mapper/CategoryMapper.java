package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.CategoryCreateDTO;
import com.pro100user.bookstorebackend.dto.CategoryDTO;
import com.pro100user.bookstorebackend.dto.CategoryUpdateDTO;
import com.pro100user.bookstorebackend.entity.Book;
import com.pro100user.bookstorebackend.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper
public interface CategoryMapper {

    Category toEntity(CategoryCreateDTO dto);
    Category toEntity(CategoryUpdateDTO dto);

    @Named("getCountBooks")
    default int getCountBooks(List<Book> books) {
        if (books == null) {
            return 0;
        }
        return books.size();
    }

    @Mapping(source = "books", target = "countBooks", qualifiedByName = "getCountBooks")
    CategoryDTO toCategoryDTO(Category category);

    @Mapping(source = "books", target = "countBooks", qualifiedByName = "getCountBooks")
    List<CategoryDTO> toCategoryDTO(List<Category> categories);
}
