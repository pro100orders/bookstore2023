package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.BasketDTO;
import com.pro100user.bookstorebackend.dto.BookCreateDTO;
import com.pro100user.bookstorebackend.dto.BookUpdateDTO;
import com.pro100user.bookstorebackend.entity.Basket;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {UserMapper.class, BookMapper.class})
public interface BasketMapper {

    BasketDTO toBasketDTO(Basket basket);
    List<BasketDTO> toBasketDTO(List<Basket> baskets);
}
