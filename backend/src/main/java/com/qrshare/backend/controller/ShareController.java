
package com.qrshare.backend.controller;

import com.qrshare.backend.model.DocumentMetadata;
import com.qrshare.backend.model.ShareLink;
import com.qrshare.backend.repository.DocumentRepository;
import com.qrshare.backend.service.DocumentStorageService;
import com.qrshare.backend.service.ShareLinkService;

import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ShareController {

    private final ShareLinkService shareLinkService;
    private final DocumentRepository documentRepository;
    private final DocumentStorageService storageService;

    public ShareController(
            ShareLinkService shareLinkService,
            DocumentRepository documentRepository,
            DocumentStorageService storageService) {

        this.shareLinkService = shareLinkService;
        this.documentRepository = documentRepository;
        this.storageService = storageService;
    }

    // Generate a share link
    @PostMapping("/documents/{id}/share")
    public ResponseEntity<?> createShareLink(
            @PathVariable UUID id) {

        ShareLink shareLink =
                shareLinkService.createShareLink(id);

        String shareUrl =
                "http://localhost:8080/api/share/"
                        + shareLink.token();

        return ResponseEntity.status(HttpStatus.CREATED).body(
                java.util.Map.of(
                        "message", "Share link generated successfully",
                        "documentId", shareLink.documentId(),
                        "token", shareLink.token(),
                        "shareUrl", shareUrl,
                        "createdAt", shareLink.createdAt(),
                        "expiresAt", shareLink.expiresAt()
                )
        );
    }


    // Public document download using share token
    @GetMapping("/share/{token}")
    public ResponseEntity<Resource> accessSharedDocument(
            @PathVariable String token) {

        // Validate the share link
        ShareLink shareLink =
                shareLinkService.getValidShareLink(token);

        // Find the associated document
        DocumentMetadata document =
                documentRepository.findById(shareLink.documentId())
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Document not found"
                        ));

        // Load the actual file
        Resource resource =
                storageService.loadFileAsResource(
                        document.storedFilename()
                );

        // Determine content type
        MediaType mediaType;

        try {
            mediaType = MediaType.parseMediaType(
                    document.contentType()
            );
        } catch (Exception exception) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        // Return the file as a download
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(document.originalFilename())
                                .build()
                                .toString()
                )
                .body(resource);
    }
}
