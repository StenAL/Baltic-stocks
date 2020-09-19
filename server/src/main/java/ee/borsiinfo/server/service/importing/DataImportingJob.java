package ee.borsiinfo.server.service.importing;

import ee.borsiinfo.server.repository.IndexRepository;
import ee.borsiinfo.server.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataImportingJob {
    public static final int FETCH_FREQUENCY_DAYS = 1;
    private static final String BALTIC_GENERAL_INDEX_TICKER = "OMXBGI";
    private static final List<String> BALTIC_MAIN_LIST_ISINS = List.of("LT0000102337", "EE3100034653", "LT0000127466", "EE3100145616",
        "EE3100007857", "EE3100016965", "EE3100127242", "LT0000130023", "LV0000100659", "LT0000102030", "EE3100004250",
        "LV0000101590", "LT0000111650", "EE3100073644", "LT0000128092", "LT0000128571", "EE3100098328", "EE3100039496",
        "LT0000131872", "LV0000100501", "EE3100006040", "EE3100101031", "LT0000101446", "LT0000111676", "LT0000100372",
        "LT0000102253", "LV0000101129", "EE3100001751", "EE3100004466", "LT0000123911", "EE0000001105", "EE3100021635",
        "EE3100026436", "LT0000127508");

    private final StockRepository stockRepository;
    private final IndexRepository indexRepository;
    private final StockDataImportingService stockDataImportingService;
    private final IndexDataImportingService indexDataImportingService;
    private final CacheManager cacheManager;

    @Scheduled(cron = "0 0 8 * * *") // 8:00:00 every day
    public void updateAllStocks() {
        log.info("Importing new stock data");
        stockRepository.saveAll(BALTIC_MAIN_LIST_ISINS.stream()
            .map(stockDataImportingService::fetchData)
            .collect(toList()));

        indexRepository.save(indexDataImportingService.fetchData(BALTIC_GENERAL_INDEX_TICKER));
        Objects.requireNonNull(cacheManager.getCache("data")).clear();
    }

}
