package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.OrderDTO;
import com.pro100user.bookstorebackend.dto.OrderUpdateDTO;
import com.pro100user.bookstorebackend.entity.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {UserMapper.class, BookMapper.class})
public interface OrderMapper {

    Order toEntity(OrderUpdateDTO dto);

    OrderDTO toOrderDTO(Order order);
    List<OrderDTO> toOrderDTO(List<Order> order);
}
