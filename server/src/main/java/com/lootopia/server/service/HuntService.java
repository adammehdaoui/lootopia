package com.lootopia.server.service;

import com.lootopia.server.domain.Hunt;
import com.lootopia.server.dto.HuntLikeDto;
import com.lootopia.server.mapper.HuntMapper;
import com.lootopia.server.repository.HuntLikeRepository;
import com.lootopia.server.repository.HuntRepository;
import com.lootopia.server.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HuntService {

    private final HuntRepository huntRepository;

    private final MemberRepository memberRepository;

    private final HuntLikeRepository huntLikeRepository;

    private final HuntMapper huntMapper;

    public HuntService(
            HuntRepository huntRepository,
            MemberRepository memberRepository,
            HuntLikeRepository huntLikeRepository,
            HuntMapper huntMapper) {
        this.huntRepository = huntRepository;
        this.memberRepository = memberRepository;
        this.huntLikeRepository = huntLikeRepository;
        this.huntMapper = huntMapper;
    }

    public List<HuntLikeDto> findAllByPopularity(String memberId) {
        List<Hunt> hunts = huntRepository.findAllByOrderByLikesDesc();

        return hunts.stream()
                .map(
                        hunt -> {
                            Long likeCount = huntLikeRepository.countHuntLikeByHuntId(hunt.getId());
                            Boolean likedBy = huntLikeRepository.existsHuntLikeByMemberIdAndHuntId(memberId, hunt.getId());

                            return new HuntLikeDto(huntMapper.toDto(hunt), likedBy, likeCount);
                        })
                .toList();
    }

}
