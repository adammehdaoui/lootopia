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

    private String username;

    private String email;

    private String password;

    @OneToMany(fetch = FetchType.LAZY)
    private Collection<Role> roles;

}
