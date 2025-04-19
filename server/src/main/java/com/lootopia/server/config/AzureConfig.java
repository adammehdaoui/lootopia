package com.lootopia.server.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "azure.storage")
@Getter
@Setter
public class AzureConfig {

    private BlobContainerClient azureClient;
    private String endpoint;
    private String container;
    private String sasToken;

    @PostConstruct
    public void init() {
        if (endpoint == null || endpoint.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage endpoint must be provided");
        }

        if (container == null || container.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage container name must be provided");
        }

        if (sasToken == null || sasToken.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage SAS token must be provided");
        }

        String containerEndpoint = String.format("%s/%s", endpoint, container);

        azureClient = new BlobContainerClientBuilder()
                .endpoint(containerEndpoint)
                .sasToken(sasToken)
                .buildClient();

        boolean exists = azureClient.exists();

        if (!exists) {
            throw new IllegalArgumentException("Blob client does not exist (check container configuration)");
        }
    }

}