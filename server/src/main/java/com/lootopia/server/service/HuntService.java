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
import com.lootopia.server.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HuntService {

    private final HuntRepository huntRepository;

    private final MemberRepository memberRepository;

    private final HuntLikeRepository huntLikeRepository;

    private final HuntMapper huntMapper;

    private final HuntLikeMapper huntLikeMapper;

    private final AuthService authService;

    private final JwtUtils jwtUtils;

    public HuntService(
            HuntRepository huntRepository,
            MemberRepository memberRepository,
            HuntLikeRepository huntLikeRepository,
            HuntMapper huntMapper,
            HuntLikeMapper huntLikeMapper,
            AuthService authService,
            JwtUtils jwtUtils
    ) {
        this.huntRepository = huntRepository;
        this.memberRepository = memberRepository;
        this.huntLikeRepository = huntLikeRepository;
        this.huntMapper = huntMapper;
        this.huntLikeMapper = huntLikeMapper;
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    public List<HuntLikeViewDto> findAllByPopularity(String token) {
        List<Hunt> hunts = huntRepository.findAllByOrderByLikesDesc();
        String plainToken = jwtUtils.extractToken(token);
        Claims claims = jwtUtils.getClaimsFromToken(plainToken);
        Member currentMember = memberRepository.findByEmail(claims.getSubject());

        return hunts.stream()
                .map(
                        hunt -> {
                            Long likeCount = huntLikeRepository.countHuntLikeByHuntId(hunt.getId());
                            Boolean likedBy = huntLikeRepository.existsHuntLikeByMemberIdAndHuntId(currentMember.getId(), hunt.getId());

                            return new HuntLikeViewDto(huntMapper.toDto(hunt), likedBy, likeCount);
                        })
                .toList();
    }

    public HuntLikeDto like(String token, String huntId) {
        Member currentMember = authService.getMemberFromToken(token);

        if (currentMember == null) {
            throw new IllegalArgumentException("Member not found");
        }

        Hunt currentHunt = huntRepository.findById(huntId);

        if (currentHunt == null) {
            throw new IllegalArgumentException("Hunt not found");
        }

        boolean alreadyLiked = huntLikeRepository.existsHuntLikeByMemberIdAndHuntId(
                currentMember.getId(),
                currentHunt.getId()
        );

        if (alreadyLiked) {
            throw new IllegalArgumentException("Hunt already liked");
        }

        HuntLike like = new HuntLike(currentMember, currentHunt);

        HuntLike huntLikeResponse = huntLikeRepository.save(like);

        return huntLikeMapper.toDto(huntLikeResponse);
    }

    public HuntLikeDto unLike(String token, String huntId) {
        Member currentMember = authService.getMemberFromToken(token);

        if (currentMember == null) {
            throw new IllegalArgumentException("Member not found");
        }

        Hunt currentHunt = huntRepository.findById(huntId);

        if (currentHunt == null) {
            throw new IllegalArgumentException("Hunt not found");
        }

        HuntLike huntLike = huntLikeRepository.findByMemberIdAndHuntId(currentMember.getId(), currentHunt.getId());

        if (huntLike == null) {
            throw new IllegalArgumentException("Hunt not liked");
        }

        huntLikeRepository.delete(huntLike);

        return huntLikeMapper.toDto(huntLike);
    }

}
