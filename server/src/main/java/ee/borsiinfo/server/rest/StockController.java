package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stocks")
public class StockController {

    private final StockRepository stockRepository;

    @RequestMapping("/")
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
}
