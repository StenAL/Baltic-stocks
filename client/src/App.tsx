import React, { ChangeEvent, Component } from "react";
import FiltersContainer from "./components/filtering/FiltersContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HighlightedStats from "./components/HighlightedStats";
import StockTable from "./components/StockTable";
import "./style/App.css";
import { Column, ColumnId, FinancialData, IndexType, RenderedData, Stock } from "./types";

interface AppState {
    stocks: Stock[];
    columns: Column[];
    sortingStocksBy: ColumnId;
    sortingOrder: "asc" | "desc";
    selectedYear: number;
    timeFetched: string;
    index: IndexType;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:12345/api";

export default class App extends Component<unknown, AppState> {
    public static readonly COLUMN_IDS: ColumnId[] = [
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
    public static readonly YEARLY_FINANCIAL_DATA_IDS: ColumnId[] = [
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

    constructor(props: unknown) {
        super(props);
        const isNarrowView = window.matchMedia("(max-width: 1100px)").matches;

        const defaultDisplayedStats: ColumnId[] = isNarrowView
            ? [
                  "name",
                  "priceBook",
                  "priceSalesTtm",
                  "roeTtm",
                  "debtEquity",
                  "revenue",
                  "netIncome",
                  "capitalExpenditure",
              ]
            : [
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

        const columns: Column[] = App.COLUMN_IDS.map((columnId) => ({
            title: columnId,
            visible: defaultDisplayedStats.includes(columnId),
        }));

        this.state = {
            stocks: [],
            columns,
            sortingStocksBy: "name",
            sortingOrder: "desc",
            selectedYear: 2020,
            timeFetched: "",
            index: {
                id: -1,
                start: "",
                end: "",
                name: "",
                ticker: "",
                changePercent: 0,
            },
        };
    }

    override async componentDidMount(): Promise<void> {
        const data = await fetch(`${API_URL}/stocks`).then((res) => res.json());

        const stocks: Stock[] = data.stocks.map((d: Stock) => ({
            ...d,
            visible: true,
        }));
        const index = data.index;
        stocks.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
            stocks,
            timeFetched: data.timeFetched,
            sortingStocksBy: "name",
            sortingOrder: "desc",
            index: index,
        });
    }

    getStockDisplayedData = (stock: Stock): RenderedData => {
        const fd = this.getDisplayedFinancialData(stock);
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
    };

    invertColumnVisibility = (event: ChangeEvent<HTMLInputElement>): void => {
        const columns: Column[] = this.state.columns.map((col) =>
            `checkbox-${col.title}` === event.target.id
                ? {
                      ...col,
                      visible: !col.visible,
                  }
                : col
        );
        this.setState({ columns });
    };

    invertCountryVisibility = (event: ChangeEvent<HTMLInputElement>): void => {
        const stocks: Stock[] = this.state.stocks.map((s) =>
            `checkbox-${s.isin}`.startsWith(event.target.id)
                ? {
                      ...s,
                      visible: event.target.checked,
                  }
                : s
        );
        this.setState({ stocks });
    };

    invertStockVisibility = (event: ChangeEvent<HTMLInputElement>): void => {
        const stocks: Stock[] = this.state.stocks.map((stock) =>
            `checkbox-${stock.name}` === event.target.id
                ? {
                      ...stock,
                      visible: !stock.visible,
                  }
                : stock
        );
        this.setState({ stocks });
    };

    getDisplayedFinancialData = (stock: Stock): FinancialData | undefined =>
        stock.financialData.filter((f) => f.year === this.state.selectedYear).pop();

    sortStocksByAttribute = (columnTitle: ColumnId): void => {
        const stocks: Stock[] = this.state.stocks.slice();
        if (columnTitle === this.state.sortingStocksBy) {
            // already sorting table by this attribute, reverse the order
            stocks.reverse();
            return this.setState({
                stocks,
                sortingOrder: this.state.sortingOrder === "desc" ? "asc" : "desc",
            });
        }
        let sortedStocks: Stock[] = stocks
            .filter(
                (s) =>
                    s[columnTitle as keyof Stock] ||
                    s.keyStats[columnTitle] ||
                    this.getDisplayedFinancialData(s)?.[columnTitle]
            ) // don't sort stocks where sorting attribute is not available
            .sort((a, b) => this.compareStocksByAttribute(a, b, columnTitle));
        sortedStocks = [
            ...stocks.filter(
                (s) =>
                    !s[columnTitle as keyof Stock] &&
                    !s.keyStats[columnTitle] &&
                    !this.getDisplayedFinancialData(s)?.[columnTitle]
            ),
            ...sortedStocks,
        ]; // add null/undefined to beginning of sorted sequence
        this.setState({
            stocks: sortedStocks,
            sortingStocksBy: columnTitle,
            sortingOrder: "desc",
        });
    };

    compareStocksByAttribute = (a: Stock, b: Stock, attribute: ColumnId): number => {
        if (attribute in a.keyStats && attribute in b.keyStats) {
            return a.keyStats[attribute] - b.keyStats[attribute];
        }
        const aFinancialData = this.getDisplayedFinancialData(a);
        const bFinancialData = this.getDisplayedFinancialData(b);
        if (aFinancialData && bFinancialData && attribute in aFinancialData && attribute in bFinancialData) {
            return aFinancialData[attribute] - bFinancialData[attribute];
        }

        // Attribute is not in KeyStats or FinancialData so it must be a key of Stock included in the table
        const narrowedAttribute = attribute as "id" | "ticker" | "name" | "isin";
        return a[narrowedAttribute].localeCompare(b[narrowedAttribute]);
    };

    getVisibleYears = (): number[] => {
        const visibleYears: number[] = this.state.stocks
            .filter((s) => s.visible)
            .map((s) => s.financialData)
            .flat()
            .filter(
                (f) =>
                    Object.values(f) // object has non-null values in more than column (year is always non-null)
                        .reduce(
                            (previousValue, currentValue) =>
                                currentValue !== null ? previousValue + 1 : previousValue,
                            0
                        ) > 1
            )
            .map((f) => f.year);
        const visibleYearsNoDuplicates = Array.from(new Set(visibleYears)); // get rid of duplicates
        visibleYearsNoDuplicates.sort();
        return visibleYearsNoDuplicates;
    };

    selectYear = (event: ChangeEvent<HTMLInputElement>): void => {
        const year: number = Number.parseInt(event.target.id.replace("radio-", ""));
        this.setState({ selectedYear: year });
    };

    override render() {
        const visibleStocksData = this.state.stocks.filter((s) => s.visible).map((s) => this.getStockDisplayedData(s));
        const visibleColumns = this.state.columns.filter((c) => c.visible).map((c) => c.title);
        const tickerSortedStocks = this.state.stocks.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));
        return (
            <div className="App">
                <Header />
                <HighlightedStats stocks={this.state.stocks} index={this.state.index} />
                <FiltersContainer
                    columns={this.state.columns}
                    stocks={tickerSortedStocks}
                    years={this.getVisibleYears()}
                    selectedYear={this.state.selectedYear}
                    onColumnChange={this.invertColumnVisibility}
                    onStockChange={this.invertStockVisibility}
                    onYearChange={this.selectYear}
                    onCountryChange={this.invertCountryVisibility}
                />
                <StockTable
                    onHeaderClick={this.sortStocksByAttribute}
                    stockDisplayValues={visibleStocksData}
                    sortingBy={this.state.sortingStocksBy}
                    sortingOrder={this.state.sortingOrder}
                    renderedColumns={visibleColumns}
                    timeFetched={this.state.timeFetched}
                />
                <Footer />
            </div>
        );
    }
}
