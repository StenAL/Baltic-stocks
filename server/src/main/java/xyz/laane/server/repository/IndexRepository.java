package xyz.laane.server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import xyz.laane.server.domain.Index;

public interface IndexRepository extends JpaRepository<Index, Long> {
    List<Index> findAll();

    List<Index> findAllByBatchId(Long id);
}
