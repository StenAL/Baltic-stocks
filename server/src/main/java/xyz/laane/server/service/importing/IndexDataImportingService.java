package xyz.laane.server.service.importing;

import xyz.laane.server.domain.Index;
import xyz.laane.server.dto.IndexDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class IndexDataImportingService {

    private static final String API_BASE_URL = "https://nasdaqbaltic.com/statistics/en/charts/charts_data_json";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final RestTemplate restTemplate;

    public Index fetchData(String ticker) {
        URI uri = UriComponentsBuilder.fromUriString(generateApiUrl(ticker)).build(true).toUri();
        IndexDTO indexDTO = restTemplate.getForObject(uri, IndexDTO.class);
        if (indexDTO == null) {
            log.error("Failed to fetch index '{}' data", ticker);
            throw new RuntimeException("Failed to fetch index " + ticker + " data");
        }
        return convertDtoToIndex(indexDTO);
    }

    private Index convertDtoToIndex(IndexDTO dto) {
        IndexDTO.IndexData.Chart chart = dto.getData().getCharts().get(0);
        Index index = Index.builder()
            .start(dto.getData().getStart())
            .end(dto.getData().getEnd())
            .ticker(chart.getTicker())
            .name(chart.getFullName())
            .changePercent(chart.getChangePercent())
            .build();
        log.info("Imported {}", index);
        return index;
    }

    private String generateApiUrl(String ticker) {
        return API_BASE_URL +
            "?indexes%5B%5D=" + ticker +
            "&start=" + LocalDate.now().minusYears(1).format(DATE_TIME_FORMATTER) +
            "&end=" + LocalDate.now().format(DATE_TIME_FORMATTER)
            + "&filter=1";
    }
}
