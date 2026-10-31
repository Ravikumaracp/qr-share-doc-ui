
package com.qrshare.backend.repository;

import com.qrshare.backend.model.DocumentMetadata;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class DocumentRepository {

    private final Map<UUID, DocumentMetadata> documents =
            new ConcurrentHashMap<>();

    public DocumentMetadata save(DocumentMetadata document) {
        documents.put(document.id(), document);
        return document;
    }

    public Optional<DocumentMetadata> findById(UUID id) {
        return Optional.ofNullable(documents.get(id));
    }

    public Map<UUID, DocumentMetadata> findAll() {
        return Map.copyOf(documents);
    }
}
