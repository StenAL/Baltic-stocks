package xyz.laane.server.repository;

import xyz.laane.server.domain.Dividend;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DividendRepository extends CrudRepository<Dividend, Long> {
}
