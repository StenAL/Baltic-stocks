package xyz.laane.server.repository;

import org.springframework.data.repository.CrudRepository;
import xyz.laane.server.domain.Batch;

public interface BatchRepository extends CrudRepository<Batch, Long> {
    Batch findTopByOrderByTimestampDesc();
}
