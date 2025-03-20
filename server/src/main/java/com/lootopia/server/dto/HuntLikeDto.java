package com.lootopia.server.dto;

public record HuntLikeDto(HuntDto huntDto, Boolean likedBy, Long likeCount) {
}
