package com.lootopia.server.repository;

import com.lootopia.server.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    List<Member> findMembersByHuntsLikesId(String id);

}
