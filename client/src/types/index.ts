export type CountryCode = "EE" | "LV" | "LT";

export interface Column {
    visible: boolean;
    title: ColumnId;
}

export interface Dividend {
    declaredDate: Date;
    exDiv: Date;
    paid: Date;
    amount: number;
}
export interface FinancialData extends Record<ColumnId, number> {
    year: number;
    revenue: number;
    operatingIncome: number;
    netIncome: number;
    earningsPerShare: number;
    dilutedSharesOutstanding: number;
    currentAssets: number;
    nonCurrentAssets: number;
    totalAssets: number;
    currentLiabilities: number;
    totalLiabilities: number;
    totalEquity: number;
    operatingCashFlow: number;
    capitalExpenditure: number;
    freeCashFlow: number;
}
export interface IndexType {
    id: number;
    start: string;
    end: string;
    ticker: string;
    name: string;
    changePercent: number;
}
export interface KeyStats extends Record<ColumnId, number> {
    priceEarningTtm: number;
    priceBook: number;
    priceSalesTtm: number;
    revenueGrowthThreeYearAvg: number;
    epsGrowthThreeYearAverage: number;
    operatingMarginTtm: number;
    netMarginTtm: number;
    roeTtm: number;
    debtEquity: number;
}

/**
 * Returned by the backend
 */
export interface Stock {
    id: string;
    name: string;
    ticker: string;
    isin: `${CountryCode}${string}`;
    financialData: FinancialData[];
    keyStats: KeyStats;
    dividends: Dividend[];
    visible: boolean;
}

/**
 * Flattened structure of Stock that is rendered in table form
 */
export interface RenderedData {
    // From Stock
    name: string;
    ticker: string;
    isin: string;

    // KeyStats
    priceEarningTtm: number;
    priceBook: number;
    priceSalesTtm: number;
    revenueGrowthThreeYearAvg: number;
    epsGrowthThreeYearAverage: number;
    operatingMarginTtm: number;
    netMarginTtm: number;
    roeTtm: number;
    debtEquity: number;

    // FinancialData
    revenue?: number;
    operatingIncome?: number;
    netIncome?: number;
    earningsPerShare?: number;
    dilutedSharesOutstanding?: number;
    currentAssets?: number;
    nonCurrentAssets?: number;
    totalAssets?: number;
    currentLiabilities?: number;
    totalLiabilities?: number;
    totalEquity?: number;
    operatingCashFlow?: number;
    capitalExpenditure?: number;
    freeCashFlow?: number;
}

export type ColumnId = keyof RenderedData;
