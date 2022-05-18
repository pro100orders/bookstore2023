package com.pro100user.bookstorebackend.dto;

import com.pro100user.bookstorebackend.entity.enums.Language;
import com.pro100user.bookstorebackend.entity.enums.Type;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class BookDTO {

    private Long id;

    private String name;

    private List<AuthorDTO> authors;

    private double price;

    private CategoryDTO category;

    private String publishing;

    private String bookSeries;

    private int amount;

    private Language language;

    private int yearPublication;

    private String translator;

    private int numberPages;

    private int circulation;

    private Type type;

    //TODO: add wishlist
}
