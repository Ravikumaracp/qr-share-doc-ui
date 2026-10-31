
package com.qrshare.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Set;
import java.util.UUID;

@Service
public class DocumentStorageService {

    private final Path storageLocation;

    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of("pdf", "jpg", "jpeg", "png", "doc", "docx");

    public DocumentStorageService(
            @Value("${qrshare.storage.location:uploads}") String location) {

        this.storageLocation = Path.of(location)
                .toAbsolutePath()
                .normalize();
    }

    public String storeFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Please select a file");
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid filename");
        }

        String extension = originalFilename.substring(
                originalFilename.lastIndexOf('.') + 1
        ).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "File type not supported");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new ResponseStatusException(
                    HttpStatus.PAYLOAD_TOO_LARGE, "Maximum file size is 10 MB");
        }

        String storedFilename = UUID.randomUUID() + "." + extension;

        try {
            Files.createDirectories(storageLocation);

            Path destination = storageLocation.resolve(storedFilename)
                    .normalize();

            if (!destination.getParent().equals(storageLocation)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Invalid file path");
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destination);

            }

            return storedFilename;

        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Could not store the uploaded file"
            );
        }
    }

    public Resource loadFileAsResource(String storedFilename) {

        try {
            Path filePath = storageLocation.resolve(storedFilename)
                    .normalize();

            // Prevent access outside the uploads directory
            if (!filePath.startsWith(storageLocation)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Invalid file path");
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            }

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Document file not found");

        } catch (MalformedURLException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Could not read the document");
        }
    }
}
