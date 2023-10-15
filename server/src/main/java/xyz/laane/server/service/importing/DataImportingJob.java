package xyz.laane.server.service.importing;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import xyz.laane.server.domain.Batch;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;
import xyz.laane.server.repository.BatchRepository;
import xyz.laane.server.repository.IndexRepository;
import xyz.laane.server.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class DataImportingJob implements ApplicationListener<ApplicationReadyEvent> {
    public static final int FETCH_FREQUENCY_DAYS = 1;
    private static final String BALTIC_GENERAL_INDEX_TICKER = "OMXBGI";
    private static final List<String> BALTIC_MAIN_LIST_ISINS = List.of(
        "LT0000102337", // Apranga
        "EE3100034653", // Arco Vara
        "LT0000127466", // AUGA group
        "EE3100007857", // Coop Pank
        "LV0000101806", // DelfinGroup
        "EE3100016965", // Ekspress Grupp
        "EE3100127242", // EfTEN Real Estate Fund III
        "EE3100137985", // Enefit Green
        "LT0000102030", // Grigeo
        "EE3100004250", // Harju Elekter Group
        "EE3100082306", // Hepsor
        "LV0000101863", // INDEXO
        "LT0000115768", // Ignitis grupė
        "LT0000111650", // Klaipėdos nafta
        "EE3100102203", // LHV Group
        "LT0000128092", // Linas Agro Group
        "EE3100098328", // Merko Ehitus
        "EE3100039496", // Nordecon
        "LT0000131872", // Novaturas
        "EE3100006040", // Pro Kapital Grupp
        "EE3100101031", // PRFoods
        "LT0000101446", // Panevėžio statybos trestas
        "LT0000111676", // Pieno žvaigždės
        "LT0000100372", // Rokiškio sūris
        "LT0000102253", // Šiaulių bankas
        "LV0000101129", // SAF Tehnika
        "EE3100001751", // Silvano Fashion Group
        "EE3100004466", // Tallink Grupp
        "LT0000123911", // Telia Lietuva
        "EE0000001105", // Tallinna Kaubamaja Grupp
        "EE3100021635", // Tallinna Sadam
        "EE3100026436", // Tallinna Vesi
        "LT0000127508" // Vilkyškių pieninė
    );

    private final StockRepository stockRepository;
    private final IndexRepository indexRepository;
    private final BatchRepository batchRepository;
    private final StockDataImportingService stockDataImportingService;
    private final IndexDataImportingService indexDataImportingService;
    private final CacheManager cacheManager;


    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        LocalDateTime lastFetch = batchRepository.findTopByOrderByTimestampDesc().getTimestamp();
        if (lastFetch.isBefore(LocalDateTime.now().minusDays(DataImportingJob.FETCH_FREQUENCY_DAYS))) {
            log.info("Current stock data is older than {} days. Fetching new data.", DataImportingJob.FETCH_FREQUENCY_DAYS);
            updateAllStocks();
        } else {
            log.debug("Current stock data is fresh. Not fetching new data");
        }
    }

    @Scheduled(cron = "0 0 8 * * *") // 8:00:00 every day
    public void updateAllStocks() {
        log.info("Importing new stock data");
        Batch batch = Batch.builder()
            .timestamp(LocalDateTime.now())
            .build();
        batchRepository.save(batch);

        List<Stock> stocks = BALTIC_MAIN_LIST_ISINS.stream()
            .parallel()
            .map(stockDataImportingService::fetchData)
            .flatMap(Optional::stream)
            .toList();
        stocks.forEach(s -> s.setBatch(batch));
        stockRepository.saveAll(stocks);
        log.info("Imported {} stocks", BALTIC_MAIN_LIST_ISINS.size());

        Index index = indexDataImportingService.fetchData(BALTIC_GENERAL_INDEX_TICKER);
        index.setBatch(batch);
        indexRepository.save(index);
        Objects.requireNonNull(cacheManager.getCache("data")).clear();
    }

}
