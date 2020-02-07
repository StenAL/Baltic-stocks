package ee.borsiinfo.server.domain;

import lombok.Data;

import java.util.List;

@Data
public class Stock {
    private String name;
    private String ticker;
    private String isin;

    private List<FinancialData> financialData;
    private KeyStats keyStats;
    private List<Dividend> dividends;
}
