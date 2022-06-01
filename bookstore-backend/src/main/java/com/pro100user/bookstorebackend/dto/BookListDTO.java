package com.pro100user.bookstorebackend.dto;

import com.pro100user.bookstorebackend.entity.enums.Language;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class BookListDTO {

    private Long id;

    private String name;

    private List<AuthorDTO> authors;

    private double price;

    private String image;

    private CategoryDTO category;

    private int amount;

    private Language language;

    private boolean isLike;
}
