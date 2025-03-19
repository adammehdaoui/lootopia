package com.lootopia.server.service;

import com.lootopia.server.domain.Hunt;
import com.lootopia.server.dto.HuntDto;
import com.lootopia.server.mapper.HuntMapper;
import com.lootopia.server.repository.HuntRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HuntService {

    private final HuntRepository huntRepository;

    private final HuntMapper huntMapper;

    public HuntService(HuntRepository huntRepository, HuntMapper huntMapper) {
        this.huntRepository = huntRepository;
        this.huntMapper = huntMapper;
    }

    public List<HuntDto> findAllByPopularity() {
        List<Hunt> hunts = huntRepository.findAllByOrderByLikesDesc();

        return huntMapper.toDtos(hunts);
    }

}
