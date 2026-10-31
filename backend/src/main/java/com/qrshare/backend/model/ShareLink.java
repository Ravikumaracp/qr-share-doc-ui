
package com.qrshare.backend.model;

import java.time.Instant;
import java.util.UUID;

public record ShareLink(
        UUID id,
        UUID documentId,
        String token,
        Instant createdAt,
        Instant expiresAt,
        boolean active
) {
}
