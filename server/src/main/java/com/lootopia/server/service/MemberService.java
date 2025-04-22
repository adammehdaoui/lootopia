package com.lootopia.server.service;

import com.azure.core.http.rest.Response;
import com.azure.core.util.Context;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.models.BlockBlobItem;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import com.lootopia.server.config.AzureConfig;
import com.lootopia.server.domain.Member;
import com.lootopia.server.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.UUID;

@Service
public class MemberService {

    private final AzureConfig azureConfig;

    private final AuthService authService;

    private final MemberRepository memberRepository;

    public MemberService(AzureConfig azureConfig, AuthService authService, MemberRepository memberRepository) {
        this.azureConfig = azureConfig;
        this.authService = authService;
        this.memberRepository = memberRepository;
    }

    public Response<BlockBlobItem> uploadAvatar(String token, MultipartFile file) throws IOException,
            IllegalArgumentException {
        Member member = authService.getMemberFromToken(token);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }

        if (member.getAvatar() != null) {
            BlobClient blobClient = azureConfig.getAzureClient().getBlobClient(member.getAvatar());

            if (Boolean.TRUE.equals(blobClient.exists())) {
                blobClient.delete();
            }
        }

        InputStream fileStream = new BufferedInputStream(file.getInputStream());

        UUID blobId = UUID.randomUUID();
        BlobParallelUploadOptions options = new BlobParallelUploadOptions(fileStream);
        Duration timeout = Duration.ofSeconds(10);
        Context context = new Context(blobId, file.getOriginalFilename());

        member.setAvatar(blobId.toString());

        memberRepository.save(member);

        String blobIdString = blobId.toString();

        BlobClient blobClient = azureConfig.getAzureClient().getBlobClient(blobIdString);

        return blobClient.uploadWithResponse(options, timeout, context);
    }

    public String getAvatar(String token) {
        Member member = authService.getMemberFromToken(token);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }

        String blobId = member.getAvatar();

        BlobClient blobClient = azureConfig.getAzureClient().getBlobClient(blobId);

        if (Boolean.FALSE.equals(blobClient.exists())) {
            throw new IllegalArgumentException("Blob not found");
        }

        return blobClient.getBlobUrl();
    }

}
