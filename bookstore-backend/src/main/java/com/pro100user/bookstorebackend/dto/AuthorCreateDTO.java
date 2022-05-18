package com.pro100user.bookstorebackend.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class AuthorCreateDTO {

    @NotNull
    @Size(max = 64, message = "Name must be up to 64 characters long")
    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @NotNull
    @Size(max = 64, message = "Surname must be up to 64 characters long")
    @NotEmpty(message = "Surname cannot be empty")
    private String surname;
}
