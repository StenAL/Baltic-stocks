import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { FiltersContainer } from "./components/filtering/FiltersContainer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HighlightedStats } from "./components/HighlightedStats";
import { StockTable } from "./components/StockTable";
import "./style/App.css";
import { Column, ColumnId, FinancialData, IndexType, RenderedData, Stock } from "./types";

const COLUMN_IDS: ColumnId[] = [
    "id",
    "ticker",
    "name",
    "isin",
    "priceEarningTtm",
    "priceBook",
    "priceSalesTtm",
    "revenueGrowthThreeYearAvg",
    "operatingMarginTtm",
    "netMarginTtm",
    "roeTtm",
    "debtEquity",
    "revenue",
    "operatingIncome",
    "netIncome",
    "earningsPerShare",
    "dilutedSharesOutstanding",
    "currentAssets",
    "nonCurrentAssets",
    "totalAssets",
    "currentLiabilities",
    "totalLiabilities",
    "totalEquity",
    "operatingCashFlow",
    "capitalExpenditure",
    "freeCashFlow",
];
export const YEARLY_FINANCIAL_DATA_IDS: ColumnId[] = [
    "revenue",
    "operatingIncome",
    "netIncome",
    "earningsPerShare",
    "dilutedSharesOutstanding",
    "currentAssets",
    "nonCurrentAssets",
    "totalAssets",
    "currentLiabilities",
    "totalLiabilities",
    "totalEquity",
    "operatingCashFlow",
    "capitalExpenditure",
    "freeCashFlow",
];

const DEFAULT_NARROW_VIEW_COLUMNS: ColumnId[] = [
    "name",
    "priceBook",
    "priceSalesTtm",
    "roeTtm",
    "debtEquity",
    "revenue",
    "netIncome",
    "capitalExpenditure",
];

const DEFAULT_WIDE_VIEW_COLUMNS: ColumnId[] = [
    "ticker",
    "name",
    "priceBook",
    "priceSalesTtm",
    "operatingMarginTtm",
    "roeTtm",
    "debtEquity",
    "revenue",
    "netIncome",
    "capitalExpenditure",
    "freeCashFlow",
];

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:12345/api";

export const App: FunctionComponent = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [startedInNarrowView] = useState<boolean>(window.matchMedia("(max-width: 1100px)").matches);
    const [columns, setColumns] = useState<Column[]>(
        COLUMN_IDS.map((columnId) => ({
            title: columnId,
            visible: startedInNarrowView
                ? DEFAULT_NARROW_VIEW_COLUMNS.includes(columnId)
                : DEFAULT_WIDE_VIEW_COLUMNS.includes(columnId),
        }))
    );
    const [sortingStocksBy, setSortingStocksBy] = useState<ColumnId | undefined>();
    const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("desc");
    const [selectedYear, setSelectedYear] = useState<number>(2020);
    const [timeFetched, setTimeFetched] = useState<string>("");
    const [index, setIndex] = useState<IndexType>({
        id: -1,
        start: "",
        end: "",
        name: "",
        ticker: "",
        changePercent: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${API_URL}/stocks`).then((res) => res.json());
            const stocks: Stock[] = data.stocks.map((d: Stock) => ({
                ...d,
                visible: true,
            }));
            stocks.sort((a, b) => a.name.localeCompare(b.name));
            setStocks(stocks);
            setTimeFetched(data.timeFetched);
            setSortingStocksBy("name");
            setIndex(data.index);
        };
        fetchData().catch((e) => console.error(`Error while fetching data: ${e}`));
    }, []);

    const invertColumnVisibility = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const newColumns: Column[] = columns.map((col) =>
                `checkbox-${col.title}` === event.target.id
                    ? {
                          ...col,
                          visible: !col.visible,
                      }
                    : col
            );
            setColumns(newColumns);
        },
        [columns]
    );

    const invertCountryVisibility = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const newStocks: Stock[] = stocks.map((s) =>
                `checkbox-${s.isin}`.startsWith(event.target.id)
                    ? {
                          ...s,
                          visible: event.target.checked,
                      }
                    : s
            );
            setStocks(newStocks);
        },
        [stocks]
    );

    const invertStockVisibility = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const newStocks: Stock[] = stocks.map((stock) =>
                `checkbox-${stock.name}` === event.target.id
                    ? {
                          ...stock,
                          visible: !stock.visible,
                      }
                    : stock
            );
            setStocks(newStocks);
        },
        [stocks]
    );

    const getVisibleYears = useCallback((): number[] => {
        const visibleYears: number[] = stocks
            .filter((s) => s.visible)
            .filter((s) => s.financialData.length > 0)
            .map((s) => s.financialData)
            .flat()
            .map((f) => f.year);
        const visibleYearsNoDuplicates = Array.from(new Set(visibleYears)); // get rid of duplicates
        visibleYearsNoDuplicates.sort();
        return visibleYearsNoDuplicates;
    }, [stocks]);

    const selectYear = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const year: number = Number.parseInt(event.target.id.replace("radio-", ""));
            setSelectedYear(year);
            if (sortingStocksBy !== undefined && YEARLY_FINANCIAL_DATA_IDS.includes(sortingStocksBy)) {
                // invalidate sorting -- there is different financial data for each year
                // if the same sorting order was kept we'd have to re-sort, causing the table entries to shift around
                setSortingStocksBy(undefined);
            }
        },
        [sortingStocksBy]
    );

    const getDisplayedFinancialData = useCallback(
        (stock: Stock): FinancialData | undefined => stock.financialData.filter((f) => f.year === selectedYear).pop(),
        [selectedYear]
    );

    const getStockDisplayedData = useCallback(
        (stock: Stock): RenderedData => {
            const fd = getDisplayedFinancialData(stock);
            return {
                id: stock.id,
                name: stock.name,
                ticker: stock.ticker,
                isin: stock.isin,
                priceEarningTtm: stock.keyStats.priceEarningTtm,
                priceBook: stock.keyStats.priceBook,
                priceSalesTtm: stock.keyStats.priceSalesTtm,
                revenueGrowthThreeYearAvg: stock.keyStats.revenueGrowthThreeYearAvg,
                epsGrowthThreeYearAverage: stock.keyStats.epsGrowthThreeYearAverage,
                operatingMarginTtm: stock.keyStats.operatingMarginTtm,
                netMarginTtm: stock.keyStats.netMarginTtm,
                roeTtm: stock.keyStats.roeTtm,
                debtEquity: stock.keyStats.debtEquity,
                revenue: fd?.revenue,
                operatingIncome: fd?.operatingIncome,
                netIncome: fd?.netIncome,
                earningsPerShare: fd?.earningsPerShare,
                dilutedSharesOutstanding: fd?.dilutedSharesOutstanding,
                currentAssets: fd?.currentAssets,
                nonCurrentAssets: fd?.nonCurrentAssets,
                totalAssets: fd?.totalAssets,
                currentLiabilities: fd?.currentLiabilities,
                totalLiabilities: fd?.totalLiabilities,
                totalEquity: fd?.totalEquity,
                operatingCashFlow: fd?.operatingCashFlow,
                capitalExpenditure: fd?.capitalExpenditure,
                freeCashFlow: fd?.freeCashFlow,
            };
        },
        [getDisplayedFinancialData]
    );

    const compareStocksByAttribute = useCallback(
        (a: Stock, b: Stock, attribute: ColumnId): number => {
            if (attribute in a.keyStats && attribute in b.keyStats) {
                return a.keyStats[attribute] - b.keyStats[attribute];
            }
            const aFinancialData = getDisplayedFinancialData(a);
            const bFinancialData = getDisplayedFinancialData(b);
            if (aFinancialData && bFinancialData && attribute in aFinancialData && attribute in bFinancialData) {
                return aFinancialData[attribute] - bFinancialData[attribute];
            }

            // Attribute is not in KeyStats or FinancialData so it must be a key of Stock included in the table
            const narrowedAttribute = attribute as "id" | "ticker" | "name" | "isin";
            return a[narrowedAttribute].localeCompare(b[narrowedAttribute]);
        },
        [getDisplayedFinancialData]
    );

    const sortStocksByAttribute = useCallback(
        (columnTitle: ColumnId): void => {
            const newStocks: Stock[] = stocks.slice();
            if (columnTitle === sortingStocksBy) {
                // already sorting table by this attribute, reverse the order
                newStocks.reverse();
                setStocks(newStocks);
                setSortingOrder(sortingOrder === "desc" ? "asc" : "desc");
                return;
            }
            let sortedStocks: Stock[] = newStocks
                .filter(
                    (s) =>
                        s[columnTitle as keyof Stock] ||
                        s.keyStats[columnTitle] ||
                        getDisplayedFinancialData(s)?.[columnTitle]
                ) // don't sort stocks where sorting attribute is not available
                .sort((a, b) => compareStocksByAttribute(a, b, columnTitle));
            sortedStocks = [
                ...stocks.filter(
                    (s) =>
                        !s[columnTitle as keyof Stock] &&
                        !s.keyStats[columnTitle] &&
                        !getDisplayedFinancialData(s)?.[columnTitle]
                ),
                ...sortedStocks,
            ]; // add stocks where sorting attribute is undefined to beginning of sorted sequence
            setStocks(sortedStocks);
            setSortingStocksBy(columnTitle);
            setSortingOrder("desc");
        },
        [stocks, sortingOrder, compareStocksByAttribute, getDisplayedFinancialData, sortingStocksBy]
    );

    const visibleStocksData = stocks.filter((s) => s.visible).map((s) => getStockDisplayedData(s));
    const visibleColumns = columns.filter((c) => c.visible).map((c) => c.title);
    const tickerSortedStocks = stocks.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));
    return (
        <div className="App">
            <Header />
            <HighlightedStats stocks={stocks} index={index} />
            <FiltersContainer
                columns={columns}
                stocks={tickerSortedStocks}
                years={getVisibleYears()}
                selectedYear={selectedYear}
                onColumnChange={invertColumnVisibility}
                onStockChange={invertStockVisibility}
                onYearChange={selectYear}
                onCountryChange={invertCountryVisibility}
            />
            <StockTable
                onHeaderClick={sortStocksByAttribute}
                stockDisplayValues={visibleStocksData}
                sortingBy={sortingStocksBy}
                sortingOrder={sortingOrder}
                renderedColumns={visibleColumns}
                timeFetched={timeFetched}
            />
            <Footer />
        </div>
    );
};
