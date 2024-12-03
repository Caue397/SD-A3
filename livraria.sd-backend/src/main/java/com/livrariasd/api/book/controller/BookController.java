package com.livrariasd.api.book.controller;

import com.livrariasd.api.book.dto.CreateBookDto;
import com.livrariasd.api.book.dto.GetMyBookDto;
import com.livrariasd.api.book.dto.ResponseBookDto;
import com.livrariasd.api.book.dto.UpdateBookDto;
import com.livrariasd.api.book.entity.Book;
import com.livrariasd.api.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping()
    public ResponseEntity<List<ResponseBookDto>> getAllBooks() {
        List<ResponseBookDto> allBooks = bookService.getAllBooks();
        return ResponseEntity.ok(allBooks);
    }

    @PostMapping("/my")
    public ResponseEntity<List<ResponseBookDto>> getMyBooks(@RequestBody GetMyBookDto data) {
        List<ResponseBookDto> books = bookService.getMyBooks(data);
        return ResponseEntity.ok(books);
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseBookDto> getBook(@PathVariable UUID id) {
        Book book = bookService.getBook(id);
        return ResponseEntity.ok(new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()));
    }

    @PostMapping()
    public ResponseEntity<ResponseBookDto> createBook(@RequestBody CreateBookDto data) {
        Book book = bookService.createBook(data);
        return ResponseEntity.ok(new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()));
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseBookDto> updateBook(@RequestBody UpdateBookDto data, @PathVariable UUID id) {
        try {
            Book book = bookService.updateBook(data, id);
            return ResponseEntity.ok(new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseBookDto> deleteBook(@PathVariable UUID id) {
        try {
            Book book = bookService.deleteBook(id);
            return ResponseEntity.ok(new ResponseBookDto(book.getId(), book.getName(), book.getAuthor(), book.getPrice()));
        } catch (Exception exception) {
            return ResponseEntity.status(404).build();
        }
    }
}
