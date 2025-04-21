package com.lootopia.server.service;

import com.azure.core.http.rest.Response;
import com.azure.core.util.Context;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.models.BlockBlobItem;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import com.lootopia.server.config.AzureConfig;
import com.lootopia.server.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;

@Service
public class MemberService {

    private final AzureConfig azureConfig;

    private final AuthService authService;

    public MemberService(AzureConfig azureConfig, AuthService authService) {
        this.azureConfig = azureConfig;
        this.authService = authService;
    }

    public Response<BlockBlobItem> uploadAvatar(String token, MultipartFile file) throws IOException,
            IllegalArgumentException {
        Member member = authService.getMemberFromToken(token);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }

        InputStream fileStream = new BufferedInputStream(file.getInputStream());

        BlobParallelUploadOptions options = new BlobParallelUploadOptions(fileStream);
        Duration timeout = Duration.ofSeconds(10);
        Context context = new Context(String.format("%s-avatar", member.getUsername()), file.getOriginalFilename());

        String blobName = getBlobName(member.getId());

        BlobClient blobClient = azureConfig.getAzureClient().getBlobClient(blobName);

        return blobClient.uploadWithResponse(options, timeout, context);
    }

    public String getAvatar(String token) {
        Member member = authService.getMemberFromToken(token);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }

        String blobName = getBlobName(member.getId());

        BlobClient blobClient = azureConfig.getAzureClient().getBlobClient(blobName);

        if (Boolean.FALSE.equals(blobClient.exists())) {
            throw new IllegalArgumentException("Blob not found");
        }

        return blobClient.getBlobUrl();
    }

    private String getBlobName(String memberId) {
        return String.format("avatar-%s", memberId);
    }

}
