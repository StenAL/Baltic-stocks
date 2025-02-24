package xyz.laane.server.service.importing;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import xyz.laane.server.domain.Index;
import xyz.laane.server.dto.IndexDTO;

@Service
@RequiredArgsConstructor
public class IndexDataImportingService {

    private static final String API_BASE_URL = "https://nasdaqbaltic.com/statistics/en/charts/charts_data_json";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final RestTemplate restTemplate;
    private final Logger log = LoggerFactory.getLogger(IndexDataImportingService.class);

    public Index fetchData(String ticker) {
        URI uri = UriComponentsBuilder.fromUriString(generateApiUrl(ticker))
                .build(true)
                .toUri();
        IndexDTO indexDTO = restTemplate.getForObject(uri, IndexDTO.class);
        if (indexDTO == null) {
            log.error("Failed to fetch index '{}' data", ticker);
            throw new RuntimeException("Failed to fetch index " + ticker + " data");
        }
        return convertDtoToIndex(indexDTO);
    }

    private Index convertDtoToIndex(IndexDTO dto) {
        IndexDTO.Chart chart = dto.data().charts().getFirst();
        Index index = Index.builder()
                .start(dto.data().start())
                .end(dto.data().end())
                .ticker(chart.ticker())
                .name(chart.fullName())
                .changePercent(chart.changePercent())
                .build();
        log.info("Imported {}", index);
        return index;
    }

    private String generateApiUrl(String ticker) {
        return API_BASE_URL + "?indexes%5B%5D="
                + ticker + "&start="
                + LocalDate.now().minusYears(1).format(DATE_TIME_FORMATTER) + "&end="
                + LocalDate.now().format(DATE_TIME_FORMATTER)
                + "&filter=1";
    }
}
