package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.dto.ImportingRequest;
import ee.borsiinfo.server.service.importing.StockDataImportingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/stocks")
public class ImportingController {

    private final StockDataImportingService stockDataImportingService;

    @RequestMapping("/import")
    public Stock importStock(@RequestBody ImportingRequest importingRequest) throws IOException {
        Stock stock = stockDataImportingService.fetchData(importingRequest.getIsin());
        return stock;
    }
}
