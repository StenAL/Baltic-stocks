package ee.borsiinfo.server.service.importing;

import ee.borsiinfo.server.domain.Stock;
import ee.borsiinfo.server.repository.DividendRepository;
import ee.borsiinfo.server.repository.FinancialDataRepository;
import ee.borsiinfo.server.repository.KeyStatsRepository;
import ee.borsiinfo.server.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final KeyStatsRepository keyStatsRepository;
    private final FinancialDataRepository financialDataRepository;
    private final DividendRepository dividendRepository;

    public void saveStock(Stock stock) {
        stock.getFinancialData().forEach(financialDataRepository::save);
        stock.getDividends().forEach(dividendRepository::save);
        keyStatsRepository.save(stock.getKeyStats());
        stockRepository.save(stock);
    }
}
