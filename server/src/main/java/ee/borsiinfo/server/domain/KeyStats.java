package ee.borsiinfo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
public class KeyStats {
    private Double priceEarningTtm;
    private Double priceBook;
    private Double priceSalesTtm;
    private Double revenueGrowth3YearAvg;
    private Double epsGrowth3YearAvg;
    private Double operatingMarginTtm;
    private Double netMarginTtm;
    private Double roeTtm;
    private Double debtEquity;
}
