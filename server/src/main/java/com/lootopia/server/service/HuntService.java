package com.lootopia.server.service;

import com.lootopia.server.domain.Hunt;
import com.lootopia.server.domain.HuntLike;
import com.lootopia.server.domain.Member;
import com.lootopia.server.dto.HuntLikeDto;
import com.lootopia.server.dto.HuntLikeViewDto;
import com.lootopia.server.mapper.HuntLikeMapper;
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

    private final HuntLikeMapper huntLikeMapper;

    public HuntService(
            HuntRepository huntRepository,
            MemberRepository memberRepository,
            HuntLikeRepository huntLikeRepository,
            HuntMapper huntMapper,
            HuntLikeMapper huntLikeMapper) {
        this.huntRepository = huntRepository;
        this.memberRepository = memberRepository;
        this.huntLikeRepository = huntLikeRepository;
        this.huntMapper = huntMapper;
        this.huntLikeMapper = huntLikeMapper;
    }

    public List<HuntLikeViewDto> findAllByPopularity(String memberId) {
        List<Hunt> hunts = huntRepository.findAllByOrderByLikesDesc();

        return hunts.stream()
                .map(
                        hunt -> {
                            Long likeCount = huntLikeRepository.countHuntLikeByHuntId(hunt.getId());
                            Boolean likedBy = huntLikeRepository.existsHuntLikeByMemberIdAndHuntId(memberId, hunt.getId());

                            return new HuntLikeViewDto(huntMapper.toDto(hunt), likedBy, likeCount);
                        })
                .toList();
    }

    public HuntLikeDto like(String memberId, String huntId) {
        Member currentMember = memberRepository.findById(memberId);

        Hunt currentHunt = huntRepository.findById(huntId);

        HuntLike like = new HuntLike(currentMember, currentHunt);

        HuntLike huntLikeResponse = huntLikeRepository.save(like);

        return huntLikeMapper.toDto(huntLikeResponse);
    }

}
