package com.pro100user.bookstorebackend.entity.enums;

public enum Status {
    OPEN("Open"),
    CLOSED("Closed");

    private String name;

    Status(String name) {
        this.name = name;
    }
}
