package ee.borsiinfo.server.domain;

import lombok.Data;

@Data
public class FinancialData {
    private int year;

    private double revenue;
    private double operatingIncome;
    private double netIncome;
    private double earningsPerShare;
    private int dilutedSharesOutstanding;

    private double currentAssets;
    private double nonCurrentAssets;
    private double totalAssets;
    private double currentLiabilities;
    private double totalLiabilities;
    private double totalEquity;

    private double operatingCashFlow;
    private double capitalExpenditure;
    private double freeCashFlow;
}
