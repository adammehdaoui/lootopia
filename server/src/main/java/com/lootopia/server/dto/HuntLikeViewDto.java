package com.lootopia.server.dto;

public record HuntLikeViewDto(HuntDto huntDto, Boolean likedBy, Long likeCount) {
}
