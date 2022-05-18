package com.pro100user.bookstorebackend.entity.enums;

public enum Language {
    UKRAINIAN("Ukrainian"),
    ENGLISH("English"),
    OTHER("Other");

    private String name;

    Language(String name) {
        this.name = name;
    }
}
