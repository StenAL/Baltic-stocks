import { FunctionComponent, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { FiltersContainer } from "./components/filtering/FiltersContainer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HighlightedStats } from "./components/HighlightedStats";
import { StockTable } from "./components/StockTable";
import "./style/App.css";
import { ActionType, DispatchContextProvider, reducer } from "./Reducer";
import { Column, ColumnId, FinancialData, IndexType, RenderedData, Stock } from "./types";

export const DEFAULT_DATA_YEAR = 2023;
const COLUMN_IDS: ColumnId[] = [
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

export const getDisplayedFinancialData = (stock: Stock, year: number): FinancialData | undefined =>
    stock.financialData.filter((f) => f.year === year).pop();

export interface AppState {
    columns: Column[];
    stocks: Stock[];
    sortingStocksBy: ColumnId | undefined;
    selectedYear: number;
    sortingOrder: "asc" | "desc";
    timeFetched: string;
    index: IndexType | undefined;
}

export const App: FunctionComponent = () => {
    const [startedInNarrowView] = useState(window.matchMedia("(max-width: 1100px)").matches);
    const [state, dispatch] = useReducer(reducer, {
        columns: COLUMN_IDS.map((columnId) => ({
            title: columnId,
            visible: startedInNarrowView
                ? DEFAULT_NARROW_VIEW_COLUMNS.includes(columnId)
                : DEFAULT_WIDE_VIEW_COLUMNS.includes(columnId),
        })),
        stocks: [],
        sortingStocksBy: undefined,
        selectedYear: DEFAULT_DATA_YEAR,
        sortingOrder: "desc",
        timeFetched: "",
        index: undefined,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data: { stocks?: Stock[]; timeFetched?: string; index?: IndexType } = await fetch(
                `${API_URL}/stocks`,
            ).then((res) => res.json());
            dispatch({
                type: ActionType.FETCH_DATA,
                stocks: data.stocks || [],
                timeFetched: data.timeFetched || "",
                index: data.index,
            });
        };
        fetchData().catch((e) => console.error(`Error while fetching data: ${e}`));
    }, []);

    const visibleYears = useMemo((): number[] => {
        const visibleYears: number[] = state.stocks
            .filter((s) => s.visible)
            .filter((s) => s.financialData.length > 0)
            .map((s) => s.financialData)
            .flat()
            .map((f) => f.year);
        const uniqueVisibleYears = Array.from(new Set(visibleYears));
        uniqueVisibleYears.sort();
        return uniqueVisibleYears;
    }, [state.stocks]);

    const getStockDisplayedData = useCallback(
        (stock: Stock): RenderedData => {
            return {
                ...stock,
                ...stock.keyStats,
                ...getDisplayedFinancialData(stock, state.selectedYear),
            };
        },
        [state.selectedYear],
    );

    const visibleStocksData = state.stocks.filter((s) => s.visible).map((s) => getStockDisplayedData(s));
    const visibleColumns = state.columns.filter((c) => c.visible).map((c) => c.title);
    const tickerSortedStocks = state.stocks.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));
    return (
        <DispatchContextProvider value={dispatch}>
            <div className="App">
                <Header />
                <HighlightedStats stocks={state.stocks} index={state.index} />
                <FiltersContainer
                    columns={state.columns}
                    stocks={tickerSortedStocks}
                    years={visibleYears}
                    selectedYear={state.selectedYear}
                />
                <StockTable
                    stocks={visibleStocksData}
                    sortingBy={state.sortingStocksBy}
                    sortingOrder={state.sortingOrder}
                    renderedColumns={visibleColumns}
                    timeFetched={state.timeFetched}
                />
                <Footer />
            </div>
        </DispatchContextProvider>
    );
};
