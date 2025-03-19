package com.lootopia.server.mapper;

import com.lootopia.server.domain.Hunt;
import com.lootopia.server.dto.HuntDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HuntMapper {

    HuntDto toDto(Hunt hunt);

    List<HuntDto> toDtos(List<Hunt> hunts);

}
