package com.lootopia.server.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @OneToMany
    private Collection<Member> members;

    @ManyToMany
    private Collection<Privilege> privileges;

}
