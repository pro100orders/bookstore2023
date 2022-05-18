package com.pro100user.bookstorebackend.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class BasketCreateDTO {

    @NotNull
    @Min(value = 1, message = "Book id cannot be less than 1")
    private Long bookId;
}
