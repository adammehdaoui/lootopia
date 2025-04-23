package com.lootopia.server.security;

import com.lootopia.server.domain.Member;
import lombok.Getter;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class CustomUserDetails implements UserDetails, CredentialsContainer {

    private final String username;
    private final List<GrantedAuthority> authorities;
    @Getter
    private final String id;
    private String password;

    public CustomUserDetails(Member member) {
        this.username = member.getUsername();
        this.password = member.getPassword();
        this.id = member.getId();

        if (member.getRoles() == null) {
            this.authorities = List.of();
            return;
        }

        this.authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public void eraseCredentials() {
        password = null;
    }

}
