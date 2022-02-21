import React, { ChangeEvent } from "react";
import "../../style/FiltersContainer.css";
import { WithTranslation, withTranslation } from "react-i18next";
import { YEARLY_FINANCIAL_DATA_IDS } from "../../App";
import { Column } from "../../types";
import ColumnFilter from "./ColumnFilter";
import { Stock } from "../../types";
import { StockFilter } from "./StockFilter";
import CountryFilter from "./CountryFilter";
import { YearFilter } from "./YearFilter";

interface FilterersContainerProps extends WithTranslation {
    columns: Column[];
    stocks: Stock[];
    years: number[];
    selectedYear: number;
    onColumnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onStockChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCountryChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onYearChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class FiltersContainer extends React.Component<FilterersContainerProps> {
    getKeyStatsFilters = (): JSX.Element[] =>
        this.props.columns
            .filter((col) => col.title !== "id")
            .filter((col) => !YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
            .map((col) => <ColumnFilter column={col} key={col.title} onChange={this.props.onColumnChange} />);

    getFinancialDataFilters = (): JSX.Element[] =>
        this.props.columns
            .filter((col) => col.title !== "id")
            .filter((col) => YEARLY_FINANCIAL_DATA_IDS.includes(col.title))
            .map((col) => <ColumnFilter column={col} key={col.title} onChange={this.props.onColumnChange} />);

    getCountryFilters = (): JSX.Element[] =>
        ["EE", "LV", "LT"].map((country) => (
            <CountryFilter
                stocks={this.props.stocks}
                key={country}
                onChange={this.props.onCountryChange}
                country={country}
            />
        ));

    getStockFilters = (): JSX.Element[] => {
        const sortedStocks = this.props.stocks.slice().sort((a, b) => a.name.localeCompare(b.name));
        return sortedStocks.map((stock) => (
            <StockFilter stock={stock} key={stock.name} onChange={this.props.onStockChange} />
        ));
    };

    getYearFilters = (): JSX.Element[] =>
        this.props.years.map((year) => (
            <YearFilter
                year={year}
                key={year}
                selected={year === this.props.selectedYear}
                onChange={this.props.onYearChange}
            />
        ));

    render() {
        const { t } = this.props;
        const keyStatsFilters = this.getKeyStatsFilters();
        const financialDataFilters = this.getFinancialDataFilters();
        const countryFilters = this.getCountryFilters();
        const stockFilters = this.getStockFilters();
        const yearFilters = this.getYearFilters();
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
    }
}

export default withTranslation()(FiltersContainer);
