package com.lootopia.server.dto;

import java.sql.Timestamp;

public record HuntDto(String id, String name, String description, Float latitude, Float longitude, Timestamp startTime,
                      Timestamp endTime) {
}
