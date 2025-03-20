package com.lootopia.server.repository;

import com.lootopia.server.domain.HuntLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HuntLikeRepository extends JpaRepository<HuntLike, Long> {

    Long countHuntLikeByHuntId(String id);

    Boolean existsHuntLikeByMemberIdAndHuntId(String memberId, String huntId);

}
