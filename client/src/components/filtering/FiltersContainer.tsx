import React from "react";
import "../../style/FiltersContainer.css"
import {Column} from "../../types/Column";
import {ColumnFilter} from "./ColumnFilter";
import {Stock} from "../../types/Stock";
import {StockFilter} from "./StockFilter";
import {CountryFilter} from "./CountryFilter";
import {YearFilter} from "./YearFilter";

interface FilterersContainerProps {
    columns: Column[],
    financialDataColumnTitles: string[],
    stocks: Stock[],
    years: number[],
    selectedYear: number,
    onColumnChange: (event) => void,
    onStockChange: (event) => void,
    onCountryChange: (event) => void,
    onYearChange: (event) => void,
}

export class FiltersContainer extends React.Component<FilterersContainerProps, object> {

    getKeyStatsFilters = () : JSX.Element[] => {
        return this.props.columns
            .filter(col => col.title !== "id")
            .filter(col => !this.props.financialDataColumnTitles.includes(col.title))
            .map(col => <ColumnFilter column={col} key={col.title} onChange={this.props.onColumnChange}/>)
    };

    getFinancialDataFilters = () : JSX.Element[] => {
        return this.props.columns
            .filter(col => col.title !== "id")
            .filter(col => this.props.financialDataColumnTitles.includes(col.title))
            .map(col => <ColumnFilter column={col} key={col.title} onChange={this.props.onColumnChange}/>)
    };

    getCountryFilters = () : JSX.Element[] => {
        return ["EE", "LV", "LT"]
            .map(country => <CountryFilter stocks={this.props.stocks} key={country} onChange={this.props.onCountryChange} country={country}/>)
    };

    getStockFilters = () : JSX.Element[] => {
        return this.props.stocks
            .map(stock => <StockFilter stock={stock} key={stock.name} onChange={this.props.onStockChange}/>)
    };

    getYearFilters = () : JSX.Element[] => {
        return this.props.years
            .map(year => <YearFilter year={year} key={year} selected={year === this.props.selectedYear} onChange={this.props.onYearChange}/>);
    };

    render() {
        const keyStatsFilters = this.getKeyStatsFilters();
        const financialDataFilters = this.getFinancialDataFilters();
        const countryFilters = this.getCountryFilters();
        const stockFilters = this.getStockFilters();
        const yearFilters = this.getYearFilters();
        return (
            <div className={"filtersContainer"}>
                <div className="filter">
                    <h2>Üldnäitajad</h2>
                    <ul className={"keyStatsFilter"}>
                        {keyStatsFilters}
                    </ul>
                    <h2>Finantsnäitajad</h2>
                    <ul className={"yearFilter"}>
                        {yearFilters}
                    </ul>
                    <ul className={"financialDataFilter"}>
                        {financialDataFilters}
                    </ul>
                </div>
                <div className="filter">
                    <h2>Aktsiad</h2>
                    <ul className={"countryFilter"}>
                        {countryFilters}
                    </ul>
                    <ul className="stockFilter">
                        {stockFilters}
                    </ul>
                </div>
            </div>
        );
    }
}