package com.livrariasd.api.book.service;

import com.livrariasd.api.auth.entity.User;
import com.livrariasd.api.auth.repository.AuthRepository;
import com.livrariasd.api.book.dto.CreateBookDto;
import com.livrariasd.api.book.dto.GetMyBookDto;
import com.livrariasd.api.book.dto.ResponseBookDto;
import com.livrariasd.api.book.dto.UpdateBookDto;
import com.livrariasd.api.book.entity.Book;
import com.livrariasd.api.book.repository.BookRepository;
import com.livrariasd.api.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepo;
    @Autowired
    private AuthRepository authRepo;
    @Autowired
    private TokenService tokenService;

    public List<ResponseBookDto> getAllBooks() {
        return bookRepo.findAll()
                .stream()
                .map(book -> new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()))
                .collect(Collectors.toList());
    }

    public Book getBook(UUID id) {
        Optional<Book> optionalBook = bookRepo.findById(id);

        if (optionalBook.isPresent()) {
            return optionalBook.get();
        }

        throw new RuntimeException("Book not found");
    }

    public List<ResponseBookDto> getMyBooks(GetMyBookDto data) {
        Optional<User> user = authRepo.findByEmail(data.email());
        if (user.isPresent()) {
            return user.get()
                    .getBooks()
                    .stream()
                    .map(book -> new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()))
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("User not found");
    }

    public Book createBook(CreateBookDto data) {
        User user = authRepo.findByEmail(data.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book newBook = new Book(data.name(), data.author(), data.price(), user);
        return bookRepo.save(newBook);
    }

    public Book updateBook(UpdateBookDto data, UUID id) {
        Optional<Book> optionalBook = bookRepo.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setName(data.name());
            book.setAuthor(data.author());
            book.setPrice(data.price());

            return bookRepo.save(book);
        }

        throw new RuntimeException("Book not found");
    }

    public Book deleteBook(UUID id) {
        Optional<Book> book = bookRepo.findById(id);

        if (book.isPresent()) {
            bookRepo.delete(book.get());
            return book.get();
        }

        throw new RuntimeException("Book not found");
    }
}
