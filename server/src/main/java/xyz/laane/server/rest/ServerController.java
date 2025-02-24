package xyz.laane.server.rest;

import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import xyz.laane.server.domain.Batch;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;
import xyz.laane.server.dto.DataResponse;
import xyz.laane.server.repository.BatchRepository;
import xyz.laane.server.repository.IndexRepository;
import xyz.laane.server.repository.StockRepository;
import xyz.laane.server.service.importing.DataImportingJob;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ServerController {

    private final StockRepository stockRepository;
    private final IndexRepository indexRepository;
    private final BatchRepository batchRepository;
    private final DataImportingJob dataImportingJob;
    private final CacheManager cacheManager;
    private final Logger log = LoggerFactory.getLogger(ServerController.class);

    @GetMapping("/stocks")
    @Cacheable("data")
    @CrossOrigin("*")
    public DataResponse getAllData() {
        log.debug("Got request to /stocks");
        Batch latestBatch = batchRepository.findTopByOrderByTimestampDesc();
        log.info("Returning data fetched at {} (batch {})", latestBatch.getTimestamp(), latestBatch.getId());
        List<Stock> stocks = stockRepository.findAllByBatchId(latestBatch.getId());
        List<Index> indexes = indexRepository.findAllByBatchId(latestBatch.getId());
        LocalDateTime timeFetched = latestBatch.getTimestamp().truncatedTo(ChronoUnit.HOURS);
        if (indexes.isEmpty()) {
            log.warn("Could not find any indexes in database from past {} days", DataImportingJob.FETCH_FREQUENCY_DAYS);
            return new DataResponse(stocks, timeFetched, null);
        }

        return new DataResponse(stocks, timeFetched, indexes.getFirst());
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
