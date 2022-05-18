package com.pro100user.bookstorebackend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class BasketDTO {

    private Long id;

    private UserDTO user;

    private List<BookListDTO> books;

    private double totalPrice;
}
