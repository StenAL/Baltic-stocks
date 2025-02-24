package xyz.laane.server.service.importing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xyz.laane.server.dto.ImportingRequest;
import xyz.laane.server.util.StringParserUtil;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import xyz.laane.server.domain.*;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockDataImportingService {

    private static final String API_BASE_URL = "https://lt.morningstar.com/gj8uge2g9k/stockreport/default.aspx";
    private static final int ISIN_PREFIX_LENGTH = 2;
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yy");
    private final Logger log = LoggerFactory.getLogger(StockDataImportingService.class);

    public Optional<Stock> fetchData(ImportingRequest importingRequest) {
        log.debug("Fetching data for request '{}'", importingRequest);
        String url = generateApiUrl(importingRequest.isin());
        log.info("Url: {}", url);
        Document doc;
        try {
            doc = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36")
                .followRedirects(true)
                .timeout(120 * 1000).get();
        } catch (IOException e) {
            log.error("Failed to connect to data API for ISIN {}", importingRequest.isin(), e);
            return Optional.empty();
        }

        try {
            Element financialDataTable = doc.selectFirst("#OverviewFinancials table");
            if (financialDataTable == null) {
                throw new RuntimeException("Could not fetch stock: no matching CSS selector for '#OverviewFinancials table'");
            }
            List<FinancialData> financialData = convertHtmlToFinancialData(financialDataTable);

            Element keyStatsTable = doc.selectFirst("#OverviewRatios table");
            if (keyStatsTable == null) {
                throw new RuntimeException("Could not fetch stock: no matching CSS selector for '#OverviewRatios table'");
            }
            KeyStats keyStats = convertHtmlToKeyStats(keyStatsTable);

            Element dividendsTable = doc.selectFirst("#OverviewDividends table");
            if (dividendsTable == null) {
                throw new RuntimeException("Could not fetch stock: no matching CSS selector for '#OverviewDividends table'");
            }
            List<Dividend> dividends = convertHtmlToDividends(dividendsTable);

            Stock stock = Stock.builder()
                .name(importingRequest.name())
                .ticker(importingRequest.ticker())
                .isin(importingRequest.isin())
                .financialData(financialData)
                .keyStats(keyStats)
                .dividends(dividends)
                .build();
            stock.getFinancialData().forEach(f -> f.setStock(stock));
            stock.getDividends().forEach(d -> d.setStock(stock));
            log.info("Imported {}", stock);
            return Optional.of(stock);
        } catch (Exception e) {
            log.error("Failed fetching stock data for ISIN {}", importingRequest.isin(), e);
        }
        return Optional.empty();
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
                case 0 -> financialData.get(j - 1).setYear(Integer.parseInt(squareText));
                case 3 -> financialData.get(j - 1).setRevenue(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 4 -> financialData.get(j - 1).setOperatingIncome(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 5 -> financialData.get(j - 1).setNetIncome(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 6 -> financialData.get(j - 1).setEarningsPerShare(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 7 -> financialData.get(j - 1).setDilutedSharesOutstanding(StringParserUtil.parseIntegerIfPresent(squareText).orElse(null));
                case 9 -> financialData.get(j - 1).setCurrentAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 10 -> financialData.get(j - 1).setNonCurrentAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 11 -> financialData.get(j - 1).setTotalAssets(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 12 -> financialData.get(j - 1).setCurrentLiabilities(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 13 -> financialData.get(j - 1).setTotalLiabilities(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 14 -> financialData.get(j - 1).setTotalEquity(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 16 -> financialData.get(j - 1).setOperatingCashFlow(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 17 -> financialData.get(j - 1).setCapitalExpenditure(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                case 18 -> financialData.get(j - 1).setFreeCashFlow(StringParserUtil.parseDoubleIfPresent(squareText).orElse(null));
                default -> {
                }
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
                .declaredDate(StringParserUtil.parseLocalDateIfPresent(squares.get(1).text(), DATE_TIME_FORMATTER).orElse(null))
                .exDiv(StringParserUtil.parseLocalDateIfPresent(squares.get(3).text(), DATE_TIME_FORMATTER).orElse(null))
                .paid(StringParserUtil.parseLocalDateIfPresent(squares.get(5).text(), DATE_TIME_FORMATTER).orElse(null))
                .amount(StringParserUtil.parseDoubleIfPresent(squares.get(7).text()).orElse(null))
                .build(),
            Dividend.builder()
                .declaredDate(StringParserUtil.parseLocalDateIfPresent(squares.get(2).text(), DATE_TIME_FORMATTER).orElse(null))
                .exDiv(StringParserUtil.parseLocalDateIfPresent(squares.get(4).text(), DATE_TIME_FORMATTER).orElse(null))
                .paid(StringParserUtil.parseLocalDateIfPresent(squares.get(6).text(), DATE_TIME_FORMATTER).orElse(null))
                .amount(StringParserUtil.parseDoubleIfPresent(squares.get(8).text()).orElse(null))
                .build()
        );

    }

}
