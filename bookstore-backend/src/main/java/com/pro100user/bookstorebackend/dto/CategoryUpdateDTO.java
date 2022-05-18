package com.pro100user.bookstorebackend.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class CategoryUpdateDTO {

    @NotNull
    @Min(value = 1, message = "Category id cannot be less than 1")
    private Long id;

    @NotNull
    @Size(max = 64, message = "Name must be up to 64 characters long")
    @NotBlank(message = "Name cannot be empty")
    private String name;
}
