package com.lootopia.server.repository;

import com.lootopia.server.domain.Hunt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HuntRepository extends JpaRepository<Hunt, Long> {

    List<Hunt> findAllByOrderByLikesDesc();

}
