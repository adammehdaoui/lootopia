package com.lootopia.server.domain;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

}
