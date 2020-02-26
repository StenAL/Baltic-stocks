package ee.borsiinfo.server.repository;

import ee.borsiinfo.server.domain.Index;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IndexRepository extends JpaRepository<Index, Long> {
    List<Index> findAllByTimeFetchedAfter(LocalDateTime time);
}
