import { ChangeEvent, FunctionComponent, useCallback } from "react";
import "../../style/FiltersContainer.css";
import { useTranslation } from "react-i18next";
import { YEARLY_FINANCIAL_DATA_IDS } from "../../App";
import { Column } from "../../types";
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
    onColumnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onStockChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCountryChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onYearChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FiltersContainer: FunctionComponent<FilterersContainerProps> = ({
    columns,
    stocks,
    years,
    selectedYear,
    onColumnChange,
    onStockChange,
    onCountryChange,
    onYearChange,
}) => {
    const { t } = useTranslation();

    const getKeyStatsFilters = useCallback(
        (): JSX.Element[] =>
            columns
                .filter((col) => !YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} onChange={onColumnChange} />),
        [columns, onColumnChange]
    );

    const getFinancialDataFilters = useCallback(
        (): JSX.Element[] =>
            columns
                .filter((col) => YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} onChange={onColumnChange} />),
        [columns, onColumnChange]
    );

    const getCountryFilters = useCallback(
        (): JSX.Element[] =>
            ["EE", "LV", "LT"].map((country) => (
                <CountryFilter stocks={stocks} key={country} onChange={onCountryChange} country={country} />
            )),
        [stocks, onCountryChange]
    );

    const getStockFilters = useCallback((): JSX.Element[] => {
        const sortedStocks = stocks.slice().sort((a, b) => a.name.localeCompare(b.name));
        return sortedStocks.map((stock) => <StockFilter stock={stock} key={stock.name} onChange={onStockChange} />);
    }, [stocks, onStockChange]);

    const getYearFilters = useCallback(
        (): JSX.Element[] =>
            years.map((year) => (
                <YearFilter year={year} key={year} selected={year === selectedYear} onChange={onYearChange} />
            )),
        [years, selectedYear, onYearChange]
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
