package com.lootopia.server.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Hunt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String description;

    private Float latitude;

    private Float longitude;

    @ManyToOne
    private Member owner;

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Member> likes;

}
