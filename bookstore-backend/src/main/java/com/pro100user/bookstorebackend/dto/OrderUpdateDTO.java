package com.pro100user.bookstorebackend.dto;

import com.pro100user.bookstorebackend.entity.enums.Status;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderUpdateDTO {

    @NotNull
    @Min(value = 1, message = "Category id cannot be less than 1")
    private Long id;

    @NotNull
    private Status status;
}
