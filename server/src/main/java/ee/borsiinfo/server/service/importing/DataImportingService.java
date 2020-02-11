package ee.borsiinfo.server.service.importing;

import ee.borsiinfo.server.domain.*;
import ee.borsiinfo.server.util.StringParserUtil;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataImportingService {

    private static final String API_BASE_URL = "https://lt.morningstar.com/gj8uge2g9k/stockreport/default.aspx";
    private static final int ISIN_PREFIX_LENGTH = 2;
    private final DateTimeFormatter dateTimeFormatter;

    public Stock fetchData(String isin) throws IOException {
        String url = generateApiUrl(isin);
        Document doc = Jsoup.connect(url).get();

        Element financialDataTable = doc.selectFirst("#OverviewFinancials table");
        List<FinancialData> financialData = convertHtmlToFinancialData(financialDataTable);

        Element keyStatsTable = doc.selectFirst("#OverviewRatios table");
        KeyStats keyStats = convertHtmlToKeyStats(keyStatsTable);

        Element dividendsTable = doc.selectFirst("#OverviewDividends table");
        List<Dividend> dividends = convertHtmlToDividends(dividendsTable);

        Stock stock = Stock.builder()
            .name(doc.selectFirst(".securityName").text())
            .ticker(doc.selectFirst(".securitySymbol").text())
            .isin(isin)
            .financialData(financialData)
            .keyStats(keyStats)
            .dividends(dividends)
            .build();
        stock.getFinancialData().forEach(f -> f.setStock(stock));
        stock.getDividends().forEach(d -> d.setStock(stock));
        return stock;
    }

    private String generateApiUrl(String isin) {
        String exchangeCode = Exchange.findByPrefix(isin.substring(0, ISIN_PREFIX_LENGTH)).getExchangeCode();
        return API_BASE_URL +
            "?externalid=" + isin +
            "&externalidexchange=" + exchangeCode
            + "&externalidtype=ISIN&LanguageId=en-GB&CurrencyId=EUR&tab=0";
    }

    private List<FinancialData> convertHtmlToFinancialData(Element financialDataTable) {
        Elements rows = financialDataTable.select("tr");
        List<FinancialData> financialData = List.of(new FinancialData(), new FinancialData(), new FinancialData());
        for (int i = 0; i < rows.size(); i++) {
            Element row = rows.get(i);
            Elements squares = row.select("th");
            squares.addAll(row.select("td"));
            parseFinancialDataTableRow(i, squares, financialData);
        }

        return financialData;
    }

    private void parseFinancialDataTableRow(int row, Elements rowSquares, List<FinancialData> financialData) {
        for (int j = 1; j < 4; j++) {
            String squareText = rowSquares.size() == 4 ? rowSquares.get(j).text() : "";
            switch (row) {
                case 0:
                    financialData.get(j - 1).setYear(Integer.parseInt(squareText));
                    break;
                case 3:
                    financialData.get(j - 1).setRevenue(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 4:
                    financialData.get(j - 1).setOperatingIncome(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 5:
                    financialData.get(j - 1).setNetIncome(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 6:
                    financialData.get(j - 1).setEarningsPerShare(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 7:
                    financialData.get(j - 1).setDilutedSharesOutstanding(StringParserUtil.parseIntegerIfPresent(squareText).orElse(null));
                    break;
                case 9:
                    financialData.get(j - 1).setCurrentAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 10:
                    financialData.get(j - 1).setNonCurrentAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 11:
                    financialData.get(j - 1).setTotalAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 12:
                    financialData.get(j - 1).setCurrentLiabilities(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 13:
                    financialData.get(j - 1).setTotalLiabilities(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 14:
                    financialData.get(j - 1).setTotalEquity(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 16:
                    financialData.get(j - 1).setOperatingCashFlow(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 17:
                    financialData.get(j - 1).setCapitalExpenditure(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                case 18:
                    financialData.get(j - 1).setFreeCashFlow(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                    break;
                default:
                    break;
            }
        }
    }

    private KeyStats convertHtmlToKeyStats(Element keyStatsTable) {
        Elements squares = keyStatsTable.select("td");
        return KeyStats.builder()
            .priceEarningTtm(StringParserUtil.parseDoubleIfPresent(squares.get(1).text()).orElse(null))
            .priceBook(StringParserUtil.parseDoubleIfPresent(squares.get(2).text()).orElse(null))
            .priceSalesTtm(StringParserUtil.parseDoubleIfPresent(squares.get(3).text()).orElse(null))
            .revenueGrowthThreeYearAvg(StringParserUtil.parseDoubleIfPresent(squares.get(4).text()).orElse(null))
            .epsGrowthThreeYearAvg(StringParserUtil.parseDoubleIfPresent(squares.get(5).text()).orElse(null))
            .operatingMarginTtm(StringParserUtil.parseDoubleIfPresent(squares.get(6).text()).orElse(null))
            .netMarginTtm(StringParserUtil.parseDoubleIfPresent(squares.get(7).text()).orElse(null))
            .roeTtm(StringParserUtil.parseDoubleIfPresent(squares.get(8).text()).orElse(null))
            .debtEquity(StringParserUtil.parseDoubleIfPresent(squares.get(9).text()).orElse(null))
            .build();
    }

    private List<Dividend> convertHtmlToDividends(Element dividendsTable) {
        Elements squares = dividendsTable.select("td");
        return List.of(
            Dividend.builder()
                .declaredDate(StringParserUtil.parseLocalDateIfPresent(squares.get(1).text(), dateTimeFormatter).orElse(null))
                .exDiv(StringParserUtil.parseLocalDateIfPresent(squares.get(3).text(), dateTimeFormatter).orElse(null))
                .paid(StringParserUtil.parseLocalDateIfPresent(squares.get(5).text(), dateTimeFormatter).orElse(null))
                .amount(StringParserUtil.parseDoubleIfPresent(squares.get(7).text()).orElse(null))
                .build(),
            Dividend.builder()
                .declaredDate(StringParserUtil.parseLocalDateIfPresent(squares.get(2).text(), dateTimeFormatter).orElse(null))
                .exDiv(StringParserUtil.parseLocalDateIfPresent(squares.get(4).text(), dateTimeFormatter).orElse(null))
                .paid(StringParserUtil.parseLocalDateIfPresent(squares.get(6).text(), dateTimeFormatter).orElse(null))
                .amount(StringParserUtil.parseDoubleIfPresent(squares.get(8).text()).orElse(null))
                .build()
        );

    }

}
