import { FunctionComponent, useCallback } from "react";
import "../../style/FiltersContainer.css";
import { useTranslation } from "react-i18next";
import { YEARLY_FINANCIAL_DATA_IDS } from "../../App";
import { Column, CountryCode } from "../../types";
import { ColumnFilter } from "./ColumnFilter";
import { Stock } from "../../types";
import { StockFilter } from "./StockFilter";
import { CountryFilter } from "./CountryFilter";
import { YearFilter } from "./YearFilter";

interface FilterersContainerProps {
    columns: Column[];
    stocks: Stock[];
    years: number[];
    selectedYear: number;
}

const COUNTRY_CODES: [CountryCode, CountryCode, CountryCode] = ["EE", "LV", "LT"];

export const FiltersContainer: FunctionComponent<FilterersContainerProps> = ({
    columns,
    stocks,
    years,
    selectedYear,
}) => {
    const { t } = useTranslation();

    const getKeyStatsFilters = useCallback(
        (): JSX.Element[] =>
            columns
                .filter((col) => !YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} />),
        [columns]
    );

    const getFinancialDataFilters = useCallback(
        (): JSX.Element[] =>
            columns
                .filter((col) => YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} />),
        [columns]
    );

    const getCountryFilters = useCallback(
        (): JSX.Element[] =>
            COUNTRY_CODES.map((countryCode) => (
                <CountryFilter
                    stocks={stocks.filter((s) => s.isin.startsWith(countryCode))}
                    key={countryCode}
                    countryCode={countryCode}
                />
            )),
        [stocks]
    );

    const getStockFilters = useCallback((): JSX.Element[] => {
        const sortedStocks = stocks.slice().sort((a, b) => a.name.localeCompare(b.name));
        return sortedStocks.map((stock) => <StockFilter stock={stock} key={stock.name} />);
    }, [stocks]);

    const getYearFilters = useCallback(
        (): JSX.Element[] =>
            years.map((year) => <YearFilter year={year} key={year} selected={year === selectedYear} />),
        [years, selectedYear]
    );
    const keyStatsFilters = getKeyStatsFilters();
    const financialDataFilters = getFinancialDataFilters();
    const countryFilters = getCountryFilters();
    const stockFilters = getStockFilters();
    const yearFilters = getYearFilters();
    return (
        <div className="filtersContainer">
            <div className="filter">
                <h2>{t("keyStats")}</h2>
                <ul className="keyStatsFilter">{keyStatsFilters}</ul>
                <h2>{t("financials")}</h2>
                <ul className={`yearFilter columns-${yearFilters.length}`}>{yearFilters}</ul>
                <ul className="financialDataFilter">{financialDataFilters}</ul>
                <p className={"financialDataDisclaimer"}>
                    <em>{t("financial data disclaimer")}</em>
                </p>
            </div>
            <div className="filter">
                <h2>{t("stocks")}</h2>
                <ul className={`countryFilter columns-${countryFilters.length}`}>{countryFilters}</ul>
                <ul className="stockFilter">{stockFilters}</ul>
            </div>
        </div>
    );
};
