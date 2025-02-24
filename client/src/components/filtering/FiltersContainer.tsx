import { FunctionComponent, useMemo, ReactElement } from "react";
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

    const keyStatsFilters = useMemo(
        (): ReactElement[] =>
            columns
                .filter((col) => !YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} />),
        [columns],
    );

    const financialDataFilters = useMemo(
        (): ReactElement[] =>
            columns
                .filter((col) => YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
                .map((col) => <ColumnFilter column={col} key={col.title} />),
        [columns],
    );

    const countryFilters = useMemo(
        (): ReactElement[] =>
            COUNTRY_CODES.map((countryCode) => (
                <CountryFilter
                    stocks={stocks.filter((s) => s.isin.startsWith(countryCode))}
                    key={countryCode}
                    countryCode={countryCode}
                />
            )),
        [stocks],
    );

    const stockFilters = useMemo((): ReactElement[] => {
        const sortedStocks = stocks.slice().sort((a, b) => a.name.localeCompare(b.name));
        return sortedStocks.map((stock) => <StockFilter stock={stock} key={stock.name} />);
    }, [stocks]);

    const yearFilters = useMemo(
        (): ReactElement[] =>
            years.map((year) => <YearFilter year={year} key={year} selected={year === selectedYear} />),
        [years, selectedYear],
    );

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
