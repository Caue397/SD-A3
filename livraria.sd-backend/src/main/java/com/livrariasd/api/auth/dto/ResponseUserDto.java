package com.livrariasd.api.auth.dto;

import java.util.UUID;

public record ResponseUserDto(UUID id, String name, String email) {
}
