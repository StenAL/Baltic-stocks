package ee.borsiinfo.server.domain;

import lombok.Data;

@Data
public class KeyStats {
    private double priceEarningTtm;
    private double priceBook;
    private double priceSalesTtm;
    private double revenueGrowth3YearAvg;
    private double epsGrowth3YearAvg;
    private double operatingMarginTtm;
    private double netMarginTtm;
    private double roeTtm;
    private double debtEquity;
}
