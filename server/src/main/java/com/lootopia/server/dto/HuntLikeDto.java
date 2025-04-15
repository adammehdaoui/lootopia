package com.lootopia.server.dto;

import com.lootopia.server.domain.Hunt;
import com.lootopia.server.domain.Member;

public record HuntLikeDto(String id, Hunt hunt, Member member) {
}
