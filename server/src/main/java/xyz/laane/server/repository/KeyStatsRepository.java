package xyz.laane.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import xyz.laane.server.domain.KeyStats;

@Repository
public interface KeyStatsRepository extends CrudRepository<KeyStats, Long> {}
