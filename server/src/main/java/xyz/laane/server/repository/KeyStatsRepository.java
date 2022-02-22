package xyz.laane.server.repository;

import xyz.laane.server.domain.KeyStats;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyStatsRepository extends CrudRepository<KeyStats, Long> {
}
