package com.pro100user.bookstorebackend.entity;

import com.pro100user.bookstorebackend.entity.enums.Role;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private List<Role> roles = new ArrayList<>();

    @Column(name = "enabled", nullable = false)
    private boolean enabled;


    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Basket.class)
    private Basket basket;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Order.class)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Book.class)
    @JoinTable(
            name = "wish_list",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id")
    )
    private List<Book> wishList = new ArrayList<>();
}


