package com.lootopia.server.mapper;

import com.lootopia.server.domain.HuntLike;
import com.lootopia.server.dto.HuntLikeDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HuntLikeMapper {

    HuntLikeDto toDto(HuntLike huntLike);

    List<HuntLikeDto> toDtos(List<HuntLike> huntLikeList);

}
