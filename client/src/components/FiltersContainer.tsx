import React from "react";
import "../style/FiltersContainer.css"
import {Column} from "../types/Column";
import {ColumnFilter} from "./ColumnFilter";
import {Stock} from "../types/Stock";
import {StockFilter} from "./StockFilter";

interface FilterersContainerProps {
    columns: Column[],
    stocks: Stock[],
    onColumnChange: (event) => void,
    onStockChange: (event) => void,
}

export class FiltersContainer extends React.Component<FilterersContainerProps, any> {

    getColumnFilters = () => {
        return this.props.columns
            .filter(col => col.title !== "id")
            .map(col => <ColumnFilter column={col} key={col.title} onChange={this.props.onColumnChange}/>)
    };

    getStockFilters = () => {
        return this.props.stocks
            .map(stock => <StockFilter stock={stock} key={stock.name} onChange={this.props.onStockChange}/>)
    };

    render() {
        const columnFilters = this.getColumnFilters();
        const stockFilters = this.getStockFilters();
        return (
            <div className={"filtersContainer"}>
                <div className="filter propertyFilter">
                    <h2>Näitajad</h2>
                    <ul>
                        {columnFilters}
                    </ul>
                </div>
                <div className="filter stockFilter">
                    <h2>Aktsiad</h2>
                    <ul>
                        {stockFilters}
                    </ul>
                </div>
            </div>
        )
    }
}