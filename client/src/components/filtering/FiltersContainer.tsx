import React from "react";
import "../../style/FiltersContainer.css"
import {Column} from "../../types/Column";
import {ColumnFilter} from "./ColumnFilter";
import {Stock} from "../../types/Stock";
import {StockFilter} from "./StockFilter";
import {CountryFilter} from "./CountryFilter";

interface FilterersContainerProps {
    columns: Column[],
    stocks: Stock[],
    onColumnChange: (event) => void,
    onStockChange: (event) => void,
    onCountryChange: (event) => void,
}

export class FiltersContainer extends React.Component<FilterersContainerProps, object> {

    getColumnFilters = () : JSX.Element[] => {
        return this.props.columns
            .filter(col => col.title !== "id")
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

    render() {
        const columnFilters = this.getColumnFilters();
        const countryFilters = this.getCountryFilters();
        const stockFilters = this.getStockFilters();
        return (
            <div className={"filtersContainer"}>
                <div className="filter propertyFilter">
                    <h2>Näitajad</h2>
                    <ul>
                        {columnFilters}
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