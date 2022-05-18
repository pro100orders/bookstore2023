package com.pro100user.bookstorebackend.entity.enums;

public enum Type {
    PAPER("Paper"),
    ELECTRONIC("Electronic");

    private String name;

    Type(String name) {
        this.name = name;
    }
}
