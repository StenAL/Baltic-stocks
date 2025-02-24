package xyz.laane.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import xyz.laane.server.domain.Dividend;

@Repository
public interface DividendRepository extends CrudRepository<Dividend, Long> {}
