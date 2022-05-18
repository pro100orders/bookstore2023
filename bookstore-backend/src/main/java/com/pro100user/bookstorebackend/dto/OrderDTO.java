package com.pro100user.bookstorebackend.dto;

import com.pro100user.bookstorebackend.entity.enums.Status;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderDTO {

    private Long id;

    private UserDTO user;

    private List<BookListDTO> books;

    private Status status;

    private double totalPrice;


    private LocalDateTime createdAt;
}
