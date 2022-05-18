package com.pro100user.bookstorebackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class CategoryDTO {

    private Long id;

    private String name;

    private int countBooks;
}
