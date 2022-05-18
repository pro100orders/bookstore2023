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
public class BookUpdateDTO {

    @NotNull
    @Min(value = 1, message = "Book id cannot be less than 1")
    private Long id;

    @NotNull
    @Size(max = 64, message = "Name must be up to 64 characters long")
    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @NotNull
    private List<Long> authorsId;

    @NotNull
    @Min(value = 0, message = "Price cannot be less than 0")
    private double price;

    @NotNull
    @Min(value = 0, message = "Category id cannot be less than 0")
    private Long categoryId;

    @NotNull
    @Size(max = 255, message = "Publishing must be up to 255 characters long")
    @NotEmpty(message = "Publishing cannot be empty")
    private String publishing;

    private String bookSeries;

    @NotNull
    @Min(value = 0, message = "Amount cannot be less than 0")
    private int amount;

    @NotNull
    private Language language;

    @NotNull
    @Min(value = 1900, message = "Year publication cannot be less than 1900")
    private int yearPublication;

    private String translator;

    @NotNull
    @Min(value = 1, message = "Number pages cannot be less than 1")
    private int numberPages;

    private int circulation;

    @NotNull
    private Type type;
}
