package com.lootopia.server.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean active;

    private String activationCode;

    @OneToMany(fetch = FetchType.LAZY)
    private Collection<Role> roles;

    @OneToMany(fetch = FetchType.LAZY)
    private Collection<Hunt> owned;

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Hunt> likes;

}
