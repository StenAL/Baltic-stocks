package xyz.laane.server.repository;

import xyz.laane.server.domain.FinancialData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialDataRepository extends CrudRepository<FinancialData, Long> {
}
