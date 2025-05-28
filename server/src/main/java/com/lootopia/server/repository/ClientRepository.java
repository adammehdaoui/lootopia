package com.lootopia.server.repository;

import com.lootopia.server.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientRepository extends JpaRepository<Client, Long> {

}
