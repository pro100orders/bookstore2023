package com.pro100user.bookstorebackend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String save(MultipartFile file, Long bookId);

    boolean update(String filepath, MultipartFile file);

    boolean delete(String filepath);
}
