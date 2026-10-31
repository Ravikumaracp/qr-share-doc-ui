
package com.qrshare.backend.repository;

import com.qrshare.backend.model.ShareLink;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ShareLinkRepository {

    private final Map<UUID, ShareLink> links =
            new ConcurrentHashMap<>();

    public ShareLink save(ShareLink shareLink) {
        links.put(shareLink.id(), shareLink);
        return shareLink;
    }

    public Optional<ShareLink> findByToken(String token) {
        return links.values()
                .stream()
                .filter(link -> link.token().equals(token))
                .findFirst();
    }
}
