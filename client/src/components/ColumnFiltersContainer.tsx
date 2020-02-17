import React from "react";
import "../style/StockTableRow.css"
import {Column} from "../types/Column";
import {ColumnFilter} from "./ColumnFilter";

interface ColumnFilterersContainerProps {
    columns: Column[],
    onChange: (event) => void,
}

export class ColumnFiltersContainer extends React.Component<ColumnFilterersContainerProps, any> {

    getColumnFilters = () => {
        return this.props.columns
            .filter(col => col.title !== "id")
            .map(col => <ColumnFilter column={col} key={col.title} onChange={this.props.onChange}/>)
    };

    render() {
        const filters = this.getColumnFilters();
        return (
            <div className="filterer">
                <h2>Filtering of columns happens here</h2>
                <ul>
                    {filters}
                </ul>
            </div>
        )
    }
}