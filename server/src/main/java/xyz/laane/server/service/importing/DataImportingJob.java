package xyz.laane.server.service.importing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import xyz.laane.server.domain.Batch;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;
import xyz.laane.server.dto.ImportingRequest;
import xyz.laane.server.repository.BatchRepository;
import xyz.laane.server.repository.IndexRepository;
import xyz.laane.server.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class DataImportingJob implements ApplicationListener<ApplicationReadyEvent> {
    public static final int FETCH_FREQUENCY_DAYS = 1;
    private static final String BALTIC_GENERAL_INDEX_TICKER = "OMXBGI";
    private static final List<ImportingRequest> BALTIC_MAIN_LIST_DATA = List.of(
            new ImportingRequest("LT0000128092", "AKO1L", "Akola Group"),
        new ImportingRequest("LT0000102337", "APG1L", "Apranga"),
        new ImportingRequest("EE3100034653", "ARC1T", "Arco Vara"),
        new ImportingRequest("EE3100007857", "CPA1T", "Coop Pank"),
        new ImportingRequest("LV0000101806", "DGR1R", "DelfinGroup"),
        new ImportingRequest("EE3100016965", "EEG1T", "Ekspress Grupp"),
        new ImportingRequest("EE3100127242", "EFT1T", "EfTEN Real Estate Fund"),
        new ImportingRequest("EE3100137985", "EGR1T", "Enefit Green"),
        new ImportingRequest("LU2818110020", "ELEVR", "Eleving Group"),
        new ImportingRequest("LT0000102030", "GRG1L", "Grigeo Group"),
        new ImportingRequest("EE3100004250", "HAE1T", "Harju Elekter Group"),
        new ImportingRequest("EE3100082306", "HPR1T", "Hepsor"),
        new ImportingRequest("LV0000101863", "IDX1R", "INDEXO"),
        new ImportingRequest("LT0000115768", "IGN1L", "Ignitis grupė"),
        new ImportingRequest("EE3100149394", "INF1T", "Infortar"),
        new ImportingRequest("LT0000111650", "KNE1L", "KN Energies"),
        new ImportingRequest("EE3100102203", "LHV1T", "LHV Group"),
        new ImportingRequest("EE3100098328", "MRK1T", "Merko Ehitus"),
        new ImportingRequest("EE3100039496", "NCN1T", "Nordecon"),
        new ImportingRequest("LT0000131872", "NTU1L", "Novaturas"),
        new ImportingRequest("EE3100006040", "PKG1T", "Pro Kapital Grupp"),
        new ImportingRequest("EE3100101031", "PRF1T", "PRFoods"),
        new ImportingRequest("LT0000101446", "PTR1L", "Panevėžio statybos trestas"),
        new ImportingRequest("LT0000111676", "PZV1L", "Pieno žvaigždės"),
        new ImportingRequest("LT0000100372", "RSU1L", "Rokiškio sūris"),
        new ImportingRequest("LT0000102253", "SAB1L", "Šiaulių bankas"),
        new ImportingRequest("LV0000101129", "SAF1R", "SAF Tehnika"),
        new ImportingRequest("EE3100001751", "SFG1T", "Silvano Fashion Group"),
        new ImportingRequest("EE3100004466", "TAL1T", "Tallink Grupp"),
        new ImportingRequest("LT0000123911", "TEL1L", "Telia Lietuva"),
        new ImportingRequest("EE0000001105", "TKM1T", "TKM Grupp"),
        new ImportingRequest("EE3100021635", "TSM1T", "Tallinna Sadam"),
        new ImportingRequest("EE3100026436", "TVE1T", "Tallinna Vesi"),
        new ImportingRequest("LT0000127508", "VLP1L", "Vilkyškių pieninė")
    );

    private final StockRepository stockRepository;
    private final IndexRepository indexRepository;
    private final BatchRepository batchRepository;
    private final StockDataImportingService stockDataImportingService;
    private final IndexDataImportingService indexDataImportingService;
    private final Logger log = LoggerFactory.getLogger(DataImportingJob.class);

    private final CacheManager cacheManager;


    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        LocalDateTime lastFetch = batchRepository.findTopByOrderByTimestampDesc().getTimestamp();
        if (lastFetch.isBefore(LocalDateTime.now().minusDays(DataImportingJob.FETCH_FREQUENCY_DAYS))) {
            log.info("Current stock data is older than {} days. Fetching new data.", DataImportingJob.FETCH_FREQUENCY_DAYS);
            try {
                updateAllStocks();
            } catch (Exception e) {
                log.error("Failed to update stocks: {}", e.getMessage(), e);
            }
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

        List<Stock> stocks = BALTIC_MAIN_LIST_DATA.stream()
            .parallel()
            .map(stockDataImportingService::fetchData)
            .flatMap(Optional::stream)
            .toList();
        stocks.forEach(s -> s.setBatch(batch));
        stockRepository.saveAll(stocks);
        log.info("Imported {} stocks", BALTIC_MAIN_LIST_DATA.size());

        Index index = indexDataImportingService.fetchData(BALTIC_GENERAL_INDEX_TICKER);
        index.setBatch(batch);
        indexRepository.save(index);
        Objects.requireNonNull(cacheManager.getCache("data")).clear();
    }

}
