package xyz.laane.server.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import xyz.laane.server.domain.Stock;

@Repository
public interface StockRepository extends CrudRepository<Stock, Long> {
    List<Stock> findAll();

    List<Stock> findAllByBatchId(Long id);
}
