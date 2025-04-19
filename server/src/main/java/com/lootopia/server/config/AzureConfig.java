package com.lootopia.server.config;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "azure.storage")
@Getter
public class AzureConfig {

    private BlobClient azureClient;
    private String endpoint;
    private String sasToken;

    @PostConstruct
    public void init() {
        if (endpoint == null || endpoint.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage endpoint must be provided");
        }

        if (sasToken == null || sasToken.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage SAS token must be provided");
        }

        BlobServiceClient azureServiceClient = new BlobServiceClientBuilder()
                .endpoint(endpoint)
                .sasToken(sasToken)
                .buildClient();

        BlobContainerClient blobContainerClient = azureServiceClient.getBlobContainerClient("main");

        azureClient = blobContainerClient.getBlobClient("main");

        boolean exists = azureClient.exists();

        if (!exists) {
            throw new IllegalArgumentException("Blob client does not exist (check container configuration)");
        }
    }


}
