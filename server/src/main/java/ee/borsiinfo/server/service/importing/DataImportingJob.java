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
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataImportingJob {
    public static final int FETCH_FREQUENCY_DAYS = 1;
    private static final String BALTIC_GENERAL_INDEX_TICKER = "OMXBGI";
    private static final List<String> BALTIC_MAIN_LIST_ISINS = List.of(
        "LT0000102337", // Apranga
        "EE3100034653", // Arco Vara
        "LT0000127466", // AUGA group
        "EE3100145616", // Baltika
        "EE3100007857", // Coop Pank
        "LV0000101806", // DelfinGroup
        "EE3100016965", // Ekspress Grupp
        "EE3100127242", // EfTEN Real Estate Fund III
        "EE3100137985", // Enefit Green
        "LT0000102030", // Grigeo
        "EE3100004250", // Harju Elekter
        "LV0000101590", // HansaMatrix
        "EE3100082306", // Hepsor
        "LT0000115768", // Ignitis grupė
        "LT0000111650", // Klaipėdos nafta
        "EE3100073644", // LHV Group
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
    private final StockDataImportingService stockDataImportingService;
    private final IndexDataImportingService indexDataImportingService;
    private final CacheManager cacheManager;

    @Scheduled(cron = "0 0 8 * * *") // 8:00:00 every day
    public void updateAllStocks() {
        log.info("Importing new stock data");
        stockRepository.saveAll(BALTIC_MAIN_LIST_ISINS.stream()
            .map(stockDataImportingService::fetchData)
            .flatMap(Optional::stream)
            .collect(toList()));

        indexRepository.save(indexDataImportingService.fetchData(BALTIC_GENERAL_INDEX_TICKER));
        Objects.requireNonNull(cacheManager.getCache("data")).clear();
    }

}
