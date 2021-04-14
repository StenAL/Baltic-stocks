package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Index;
import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.dto.DataResponse;
import ee.borsiinfo.server.repository.IndexRepository;
import ee.borsiinfo.server.repository.StockRepository;
import ee.borsiinfo.server.service.importing.DataImportingJob;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
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
        try {
            List<Stock> stocks = stockRepository.findAllByTimeFetchedAfter(fetchAfter);
            Index index = indexRepository.findAllByTimeFetchedAfter(fetchAfter).get(0);
            LocalDateTime timeFetched = stocks.get(0).getTimeFetched().truncatedTo(ChronoUnit.HOURS);
            return new DataResponse(stocks, timeFetched, index);
        } catch (Exception e) {
            log.error("Failed to fetch stocks", e);
            return new DataResponse(null, LocalDateTime.now(), null);
        }
    }

    @PostMapping("/importAll")
    public void importAllData() {
        try {
            dataImportingJob.updateAllStocks();
        } catch (Exception e) {
            log.error("Failed to import data", e);
        }
    }

    @PostMapping("/clearCache")
    public void clearStocksCache() {
        try {
            cacheManager.getCache("data").clear();
        } catch (Exception e) {
            log.error("Failed to clear cache", e);
        }
    }
}
