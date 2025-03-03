package com.lootopia.server.service;

import com.lootopia.server.domain.Member;
import com.lootopia.server.repository.MemberRepository;
import com.lootopia.server.security.CustomUserDetails;
import com.lootopia.server.utils.PasswordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    public AuthService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public CustomUserDetails askForRegister(UUID uuid, String email, String rawPassword) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            LOGGER.error("User already exists");
            return new CustomUserDetails(member);
        }

        Member newMember = new Member();

        newMember.setEmail(email);
        newMember.setUsername(email);
        newMember.setPassword(PasswordUtils.hashPassword(rawPassword));
        newMember.setActivationCode(uuid.toString());

        memberRepository.save(newMember);

        return new CustomUserDetails(newMember);
    }

}
