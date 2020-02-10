package ee.borsiinfo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialData {
    private int year;

    private Double revenue;
    private Double operatingIncome;
    private Double netIncome;
    private Double earningsPerShare;
    private Integer dilutedSharesOutstanding;

    private Double currentAssets;
    private Double nonCurrentAssets;
    private Double totalAssets;
    private Double currentLiabilities;
    private Double totalLiabilities;
    private Double totalEquity;

    private Double operatingCashFlow;
    private Double capitalExpenditure;
    private Double freeCashFlow;
}
