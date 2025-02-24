import { createContext, Dispatch, Reducer, useContext } from "react";
import { AppState, getDisplayedFinancialData, YEARLY_FINANCIAL_DATA_IDS } from "./App";
import { Column, ColumnId, CountryCode, FinancialData, IndexType, KeyStats, Stock } from "./types";

export enum ActionType {
    FETCH_DATA = "FETCH_DATA",
    SORT_STOCKS = "SORT_STOCKS",
    INVERT_STOCK_VISIBILITY = "INVERT_STOCK_VISIBILITY",
    TOGGLE_COUNTRY_STOCKS = "TOGGLE_COUNTRY_STOCKS",
    TOGGLE_COLUMN_VISIBILITY = "TOGGLE_COLUMN_VISIBILITY",
    SELECT_YEAR = "SELECT_YEAR",
}

export type Action =
    | FetchDataAction
    | SortAction
    | InvertStockVisibilityAction
    | ToggleCountryStocksAction
    | ToggleColumnVisibilityAction
    | SelectYearAction;

interface ActionBase {
    type: ActionType;
}

interface FetchDataAction extends ActionBase {
    type: ActionType.FETCH_DATA;
    stocks: Stock[];
    timeFetched: string;
    index?: IndexType;
}

export interface SortAction extends ActionBase {
    type: ActionType.SORT_STOCKS;
    columnId: ColumnId;
}

interface InvertStockVisibilityAction extends ActionBase {
    type: ActionType.INVERT_STOCK_VISIBILITY;
    isin: string;
}

interface ToggleCountryStocksAction extends ActionBase {
    type: ActionType.TOGGLE_COUNTRY_STOCKS;
    countryCode: CountryCode;
    visible: boolean;
}

interface ToggleColumnVisibilityAction extends ActionBase {
    type: ActionType.TOGGLE_COLUMN_VISIBILITY;
    columnId: ColumnId;
}

interface SelectYearAction extends ActionBase {
    type: ActionType.SELECT_YEAR;
    year: number;
}

const compareStocksByAttribute = (a: Stock, b: Stock, attribute: ColumnId, year: number): number => {
    if (attribute in a.keyStats && attribute in b.keyStats) {
        const keyStatsAttribute = attribute as keyof KeyStats & ColumnId;
        return a.keyStats[keyStatsAttribute] - b.keyStats[keyStatsAttribute];
    } else if (attribute in a.keyStats) {
        return 1;
    } else if (attribute in b.keyStats) {
        return -1;
    }

    const aFinancialData = getDisplayedFinancialData(a, year);
    const bFinancialData = getDisplayedFinancialData(b, year);
    if (aFinancialData && bFinancialData && attribute in aFinancialData && attribute in bFinancialData) {
        const financialDataAttribute = attribute as keyof FinancialData & ColumnId;
        return aFinancialData[financialDataAttribute] - bFinancialData[financialDataAttribute];
    } else if (aFinancialData && attribute in aFinancialData) {
        return 1;
    } else if (bFinancialData && attribute in bFinancialData) {
        return -1;
    }

    // Attribute is not in KeyStats or FinancialData so it must be a key of Stock included in the table
    if (attribute in a && attribute in b) {
        const stockAttribute = attribute as keyof Stock & ColumnId;
        return a[stockAttribute].localeCompare(b[stockAttribute]);
    } else if (attribute in a) {
        return 1;
    } else if (attribute in b) {
        return -1;
    }
    return 0;
};

export const reducer: Reducer<AppState, Action> = (state, action) => {
    switch (action.type) {
        case ActionType.FETCH_DATA:
            const fetchedStocks =
                action.stocks?.map((d: Stock) => ({
                    ...d,
                    visible: true,
                })) || [];
            fetchedStocks.sort((a, b) => a.name.localeCompare(b.name));
            return {
                ...state,
                stocks: fetchedStocks,
                sortingStocksBy: "name",
                timeFetched: action.timeFetched,
                index: action.index,
            };
        case ActionType.SORT_STOCKS:
            const columnTitle = action.columnId;
            const newStocks: Stock[] = state.stocks.slice();
            if (columnTitle === state.sortingStocksBy) {
                // already sorting table by this attribute, reverse the order
                newStocks.reverse();
                return { ...state, stocks: newStocks, sortingOrder: state.sortingOrder === "desc" ? "asc" : "desc" };
            }
            let sortedStocks: Stock[] = newStocks.sort((a, b) =>
                compareStocksByAttribute(a, b, columnTitle, state.selectedYear),
            );
            return { ...state, stocks: sortedStocks, sortingStocksBy: columnTitle, sortingOrder: "desc" };
        case ActionType.INVERT_STOCK_VISIBILITY:
            const invertedVisibilityStocks: Stock[] = state.stocks.map((stock) =>
                stock.isin === action.isin
                    ? {
                          ...stock,
                          visible: !stock.visible,
                      }
                    : stock,
            );
            return { ...state, stocks: invertedVisibilityStocks };
        case ActionType.TOGGLE_COUNTRY_STOCKS:
            const toggledCountryStocks: Stock[] = state.stocks.map((s) =>
                s.isin.startsWith(action.countryCode)
                    ? {
                          ...s,
                          visible: action.visible,
                      }
                    : s,
            );
            return { ...state, stocks: toggledCountryStocks };
        case ActionType.TOGGLE_COLUMN_VISIBILITY:
            const newColumns: Column[] = state.columns.map((col) =>
                col.title === action.columnId
                    ? {
                          ...col,
                          visible: !col.visible,
                      }
                    : col,
            );
            return { ...state, columns: newColumns };
        case ActionType.SELECT_YEAR:
            // If 'sortingStocksBy' is FinancialData, we need to invalidate sorting -- there is different financial data for each year
            // if the same sorting order was kept we'd have to re-sort, causing the table entries to shift around
            const newSortingStocksBy =
                state.sortingStocksBy && YEARLY_FINANCIAL_DATA_IDS.includes(state.sortingStocksBy)
                    ? state.sortingStocksBy
                    : undefined;
            return { ...state, selectedYear: action.year, sortingStocksBy: newSortingStocksBy };
    }
    return state;
};

export const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export const useDispatchContext: () => Dispatch<Action> = () => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
        throw new Error("useDispatchContext must be used within a CountProvider");
    }
    return context;
};
