package xyz.laane.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import xyz.laane.server.domain.FinancialData;

@Repository
public interface FinancialDataRepository extends CrudRepository<FinancialData, Long> {}
