
package com.qrshare.backend.controller;

import com.qrshare.backend.model.DocumentMetadata;
import com.qrshare.backend.repository.DocumentRepository;
import com.qrshare.backend.service.DocumentStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ContentDisposition;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentStorageService storageService;
    private final DocumentRepository documentRepository;

    public DocumentController(
            DocumentStorageService storageService,
            DocumentRepository documentRepository) {

        this.storageService = storageService;
        this.documentRepository = documentRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<DocumentMetadata> uploadDocument(
            @RequestParam("file") MultipartFile file) {

        String storedFilename = storageService.storeFile(file);

        DocumentMetadata document = new DocumentMetadata(
                UUID.randomUUID(),
                file.getOriginalFilename(),
                storedFilename,
                file.getContentType(),
                file.getSize(),
                Instant.now()
        );

        documentRepository.save(document);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(document);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentMetadata> getDocument(
            @PathVariable UUID id) {

        return documentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Map<UUID, DocumentMetadata>> getAllDocuments() {
        return ResponseEntity.ok(documentRepository.findAll());
    }


    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable UUID id) {

        // Find document metadata
        DocumentMetadata document = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Document not found"));

        // Retrieve actual file
        Resource resource = storageService.loadFileAsResource(
                document.storedFilename());

        // Determine content type
        MediaType mediaType;

        try {
            mediaType = MediaType.parseMediaType(document.contentType());
        } catch (Exception exception) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        // Return file as download
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
