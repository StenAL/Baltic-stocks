package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Index;
import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.dto.DataResponse;
import ee.borsiinfo.server.repository.IndexRepository;
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
@RequestMapping("/api")
public class ServerController {

    private final StockRepository stockRepository;
    private final IndexRepository indexRepository;
    private final DataImportingJob dataImportingJob;
    private final CacheManager cacheManager;

    @GetMapping("/stocks")
    @Cacheable("data")
    @CrossOrigin("*")
    public DataResponse getAllData() {
        LocalDateTime fetchAfter = LocalDateTime.now().minusDays(DataImportingJob.FETCH_FREQUENCY_DAYS);
        List<Stock> stocks = stockRepository.findAllByTimeFetchedAfter(fetchAfter);
        Index index = indexRepository.findAllByTimeFetchedAfter(fetchAfter).get(0);
        LocalDateTime timeFetched = stocks.get(0).getTimeFetched().truncatedTo(ChronoUnit.HOURS);
        return new DataResponse(stocks, timeFetched, index);
    }

    @PostMapping("/importAll")
    public void importAllData() {
        dataImportingJob.updateAllStocks();
    }

    @PostMapping("/clearCache")
    public void clearStocksCache() {
        cacheManager.getCache("data").clear();
    }
}
