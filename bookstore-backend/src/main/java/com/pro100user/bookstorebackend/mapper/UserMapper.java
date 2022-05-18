package com.pro100user.bookstorebackend.mapper;

import com.pro100user.bookstorebackend.dto.UserCreateDTO;
import com.pro100user.bookstorebackend.dto.UserDTO;
import com.pro100user.bookstorebackend.dto.UserUpdateDTO;
import com.pro100user.bookstorebackend.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserCreateDTO dto);
    User toEntity(UserUpdateDTO dto);

    UserDTO toUserDTO(User user);
    List<UserDTO> toUserDTO(List<User> users);

}
