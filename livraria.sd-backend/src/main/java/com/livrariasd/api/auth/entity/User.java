package com.livrariasd.api.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.livrariasd.api.book.entity.Book;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String username;
    private String email;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Book> books;

    @CreationTimestamp
    private Instant creationTimestamp;
    @UpdateTimestamp
    private Instant updateTimestamp;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail () {
        return email;
    }

    public String getHashPassword() {
        return password;
    }

    public List<Book> getBooks() {
        return books;
    }
}
