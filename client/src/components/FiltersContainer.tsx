import React from "react";
import "../style/FiltersContainer.css"
import {Column} from "../types/Column";
import {ColumnFilter} from "./ColumnFilter";

interface FilterersContainerProps {
    columns: Column[],
    onChange: (event) => void,
}

export class FiltersContainer extends React.Component<FilterersContainerProps, any> {

    getColumnFilters = () => {
        return this.props.columns
            .filter(col => col.title !== "id")
            .map(col => <ColumnFilter column={col} key={col.title} onChange={this.props.onChange}/>)
    };

    render() {
        const columnFilters = this.getColumnFilters();
        return (
            <div className={"filtersContainer"}>
                <div className="filter">
                    <h2>Columns filtering</h2>
                    <ul>
                        {columnFilters}
                    </ul>
                </div>
                <div className="filter">
                    <h2>Rows filtering</h2>
                    <ul>
                        {columnFilters}
                    </ul>
                </div>
            </div>
        )
    }
}