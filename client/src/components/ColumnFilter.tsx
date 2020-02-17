import React from "react";
import "../style/StockTableRow.css"
import {Column} from "../types/Column";

interface ColumnFilterProps {
    column: Column,
    onChange: (event) => void;
}

export class ColumnFilter extends React.Component<ColumnFilterProps, any> {

    render() {
        return (
            <li className="filterer">
                <input type="checkbox" name={this.props.column.name} defaultChecked={this.props.column.visible} onChange={this.props.onChange}/>
                <label htmlFor={this.props.column.name}>{this.props.column.name}</label>
            </li>
        )
    }
}