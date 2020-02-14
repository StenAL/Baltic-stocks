import {FinancialData} from "./FinancialData";
import {KeyStats} from "./KeyStats";
import {Dividend} from "./Dividend";

export interface Stock {
    name: string,
    ticker: string,
    isin: string,
    financialData: FinancialData[],
    keyStats: KeyStats,
    dividends: Dividend[],
}