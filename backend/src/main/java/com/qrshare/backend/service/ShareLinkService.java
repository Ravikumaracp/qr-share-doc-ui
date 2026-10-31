
package com.qrshare.backend.service;

import com.qrshare.backend.model.ShareLink;
import com.qrshare.backend.repository.DocumentRepository;
import com.qrshare.backend.repository.ShareLinkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.UUID;

@Service
public class ShareLinkService {

    private final DocumentRepository documentRepository;
    private final ShareLinkRepository shareLinkRepository;

    private final SecureRandom secureRandom = new SecureRandom();

    public ShareLinkService(
            DocumentRepository documentRepository,
            ShareLinkRepository shareLinkRepository) {

        this.documentRepository = documentRepository;
        this.shareLinkRepository = shareLinkRepository;
    }

    public ShareLink createShareLink(UUID documentId) {

        // Check whether the document exists
        documentRepository.findById(documentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Document not found"));

        // Generate a cryptographically secure random token
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        String token = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);

        Instant createdAt = Instant.now();
        Instant expiresAt = createdAt.plus(7, ChronoUnit.DAYS);

        ShareLink shareLink = new ShareLink(
                UUID.randomUUID(),
                documentId,
                token,
                createdAt,
                expiresAt,
                true
        );

        return shareLinkRepository.save(shareLink);
    }
    public ShareLink getValidShareLink(String token) {

        // Find the share link using its token
        ShareLink shareLink = shareLinkRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Share link not found"
                ));

        // Check whether the link is active
        if (!shareLink.active()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This share link has been revoked"
            );
        }

        // Check expiry
        if (!shareLink.expiresAt().isAfter(Instant.now())) {
            throw new ResponseStatusException(
                    HttpStatus.GONE,
                    "This share link has expired"
            );
        }

        return shareLink;
    }
}
