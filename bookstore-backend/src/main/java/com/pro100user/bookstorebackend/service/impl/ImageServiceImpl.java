package com.pro100user.bookstorebackend.service.impl;

import com.pro100user.bookstorebackend.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final String filepath;

    public ImageServiceImpl() {
        try {
            filepath = ResourceUtils.getFile("classpath:").getPath() + "/static/files/";
            File directory = new File(filepath);
            if (!directory.exists()) {
                Files.createDirectories(directory.toPath());
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String save(MultipartFile file, Long productId) {
        try {
            File image = new File(filepath + productId.toString() + file.getOriginalFilename());
            if (!image.exists()) {
                image.createNewFile();
            }
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(image));
            bos.write(file.getBytes());
            bos.flush();
            bos.close();
            return productId.toString() + file.getOriginalFilename();
        } catch (IOException e) {
            return null;
        }
    }

    @Override
    public boolean update(String filename, MultipartFile file) {
        try {
            File image = new File(filepath + filename);
            if (!image.exists()) {
                image.createNewFile();
            }
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(image));
            bos.write(file.getBytes());
            bos.flush();
            bos.close();
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    @Override
    public boolean delete(String filename) {
        File image = new File(filepath + filename);
        if (image.exists()) {
            return image.delete();
        }
        return false;
    }
}
