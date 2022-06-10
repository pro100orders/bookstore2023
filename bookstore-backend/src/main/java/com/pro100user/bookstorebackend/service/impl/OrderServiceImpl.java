package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.dto.CategoryUpdateDTO;
import com.pro100user.bookstorebackend.dto.OrderDTO;
import com.pro100user.bookstorebackend.dto.OrderUpdateDTO;
import com.pro100user.bookstorebackend.entity.Category;
import com.pro100user.bookstorebackend.entity.Order;
import com.pro100user.bookstorebackend.mapper.OrderMapper;
import com.pro100user.bookstorebackend.repository.OrderRepository;
import com.pro100user.bookstorebackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getById(Long orderId) {
        return orderMapper.toOrderDTO(
                orderRepository.findById(orderId).orElseThrow()
        );
    }

    @Override
    public OrderDTO update(OrderUpdateDTO dto) {
        Order entity =  orderRepository.findById(dto.getId()).orElseThrow();
        entity.setStatus(dto.getStatus());
        return orderMapper.toOrderDTO(
                orderRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long orderId) {
        orderRepository.deleteById(orderId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAll() {
        return orderMapper.toOrderDTO(
                orderRepository.findAll()
        );
    }
}
