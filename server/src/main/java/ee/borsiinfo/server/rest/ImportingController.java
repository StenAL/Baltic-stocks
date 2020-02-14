package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.dto.ImportingRequest;
import ee.borsiinfo.server.repository.StockRepository;
import ee.borsiinfo.server.service.importing.DataImportingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/stocks")
@Slf4j
public class ImportingController {

    private final DataImportingService dataImportingService;
    private final StockRepository stockRepository;

    @PostMapping("/import")
    public Stock importStock(@RequestBody ImportingRequest importingRequest) {
        Stock stock = dataImportingService.fetchData(importingRequest.getIsin());
        log.debug("Fetched stock: {}", stock);
        stockRepository.save(stock);
        return stock;
    }
}
