package ee.borsiinfo.server.repository;

import ee.borsiinfo.server.domain.Dividend;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DividendRepository extends CrudRepository<Dividend, Long> {
}
