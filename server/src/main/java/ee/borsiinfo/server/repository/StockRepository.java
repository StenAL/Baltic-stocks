package ee.borsiinfo.server.repository;

import ee.borsiinfo.server.domain.Stock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends CrudRepository<Stock, Long> {
    List<Stock> findAll();
}
