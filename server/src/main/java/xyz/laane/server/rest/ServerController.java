package xyz.laane.server.rest;

import org.springframework.cache.Cache;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;
import xyz.laane.server.dto.DataResponse;
import xyz.laane.server.repository.IndexRepository;
import xyz.laane.server.repository.StockRepository;
import xyz.laane.server.service.importing.DataImportingJob;
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
        log.debug("Fetching data");
        LocalDateTime fetchAfter = LocalDateTime.now().minusDays(DataImportingJob.FETCH_FREQUENCY_DAYS);
        List<Stock> stocks = stockRepository.findAllByTimeFetchedAfter(fetchAfter);
        List<Index> indexes = indexRepository.findAllByTimeFetchedAfter(fetchAfter);
        if (stocks.isEmpty()) {
            log.warn("Could not find any stocks in database from past {} days", DataImportingJob.FETCH_FREQUENCY_DAYS);
            return new DataResponse(null, LocalDateTime.now(), null);
        }
        if (indexes.isEmpty()) {
            log.warn("Could not find any indexes in database from past {} days", DataImportingJob.FETCH_FREQUENCY_DAYS);
            return new DataResponse(stocks, LocalDateTime.now(), null);
        }

        LocalDateTime timeFetched = stocks.get(0).getTimeFetched().truncatedTo(ChronoUnit.HOURS);
        return new DataResponse(stocks, timeFetched, indexes.get(0));
    }

    @PostMapping("/importAll")
    public void importAllData() {
        log.debug("Importing stocks data");
        try {
            dataImportingJob.updateAllStocks();
        } catch (Exception e) {
            log.error("Failed to import data", e);
        }
    }

    @PostMapping("/clearCache")
    public void clearStocksCache() {
        log.debug("Clearing stocks cache");
        Cache cache = cacheManager.getCache("data");
        if (cache == null) {
            throw new RuntimeException("Stocks cache does not exist and couldn't be created");
        }
        cache.clear();
    }
}
