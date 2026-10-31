
package com.qrshare.backend.model;

import java.time.Instant;
import java.util.UUID;

public record DocumentMetadata(
        UUID id,
        String originalFilename,
        String storedFilename,
        String contentType,
        long fileSize,
        Instant uploadedAt
) {
}
