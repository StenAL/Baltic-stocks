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
export interface FinancialData {
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
export interface KeyStats {
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

export interface Stock {
    id: string;
    name: string;
    ticker: string;
    isin: string;
    financialData: FinancialData[];
    keyStats: KeyStats;
    dividends: Dividend[];
    visible: boolean;
}

export interface RenderedData {
    id?: string;
    name?: string;
    ticker?: string;
    isin?: string;
    priceEarningTtm?: number;
    priceBook?: number;
    priceSalesTtm?: number;
    revenueGrowthThreeYearAvg?: number;
    epsGrowthThreeYearAverage?: number;
    operatingMarginTtm?: number;
    netMarginTtm?: number;
    roeTtm?: number;
    debtEquity?: number;
    year?: number;
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
