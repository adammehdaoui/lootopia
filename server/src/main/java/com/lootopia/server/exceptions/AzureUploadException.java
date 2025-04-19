package com.lootopia.server.exceptions;

public class AzureUploadException extends RuntimeException {

    public AzureUploadException(String cause) {
        super(String.format("Failed to upload the file to Azure : %s", cause));
    }

}
