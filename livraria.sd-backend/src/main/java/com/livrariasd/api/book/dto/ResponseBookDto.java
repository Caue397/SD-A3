package com.livrariasd.api.book.dto;

import java.util.UUID;

public record ResponseBookDto(UUID id, String name, String author, String price) {
}
