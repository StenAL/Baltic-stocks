package ee.borsiinfo.server.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.dto.StockResponse;
import ee.borsiinfo.server.repository.StockRepository;
import ee.borsiinfo.server.service.importing.DataImportingJob;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    private final StockRepository stockRepository;
    private final CacheManager cacheManager;

    @GetMapping("")
    @Cacheable("stocks")
    public StockResponse getAllStocks() {
        LocalDateTime fetchAfter = LocalDateTime.now().minusDays(DataImportingJob.FETCH_FREQUENCY_DAYS);
        List<Stock> stocks = stockRepository.findAllByTimeFetchedAfter(fetchAfter);
        LocalDateTime timeFetched = stocks.get(0).getTimeFetched().truncatedTo(ChronoUnit.HOURS);
        return new StockResponse(stocks, timeFetched);
    }

    @PostMapping("/clearCache")
    public void clearStocksCache() {
        cacheManager.getCache("stocks").clear();
    }
}
