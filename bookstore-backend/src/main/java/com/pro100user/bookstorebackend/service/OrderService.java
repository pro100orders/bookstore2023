package com.pro100user.bookstorebackend.service;

import com.pro100user.bookstorebackend.dto.OrderDTO;
import com.pro100user.bookstorebackend.dto.OrderUpdateDTO;

import java.util.List;

public interface OrderService {

    OrderDTO create(Long userId);
    OrderDTO getById(Long orderId);
    OrderDTO update(OrderUpdateDTO dto);
    boolean delete(Long orderId);
    List<OrderDTO> getAll();
}
