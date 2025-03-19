package com.lootopia.server.repository;

import com.lootopia.server.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    public Member findByEmail(String email);

}
