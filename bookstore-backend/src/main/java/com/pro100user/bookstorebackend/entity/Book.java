package com.pro100user.bookstorebackend.entity;


import com.pro100user.bookstorebackend.entity.enums.Language;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "books")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Author.class)
    @JoinTable(
            name = "author_books",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private List<Author> authors = new ArrayList<>();

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Category.class)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "publishing", nullable = false)
    private String publishing;

    @Column(name = "book_series")
    private String bookSeries;

    @Column(name = "amount", nullable = false)
    private int amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @Column(name = "year_publication", nullable = false)
    private int yearPublication;

    @Column(name = "translator")
    private String translator;

    @Column(name = "number_pages", nullable = false)
    private int numberPages;


    @ManyToMany(mappedBy = "books", fetch = FetchType.LAZY, targetEntity = Basket.class)
    private List<Basket> baskets = new ArrayList<>();

    @ManyToMany(mappedBy = "books", fetch = FetchType.LAZY, targetEntity = Order.class)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany(mappedBy = "wishList", fetch = FetchType.LAZY, targetEntity = User.class)
    private List<User> users = new ArrayList<>();
}
