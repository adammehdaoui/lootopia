package com.lootopia.server.dto;

public record HuntDto(String id, String name, String description, Float latitude, Float longitude, String startTime,
                      String endTime) {
}
