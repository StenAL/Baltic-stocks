import React from "react";
import "../style/ColumnFilter.css"
import {Stock} from "../types/Stock";

interface StockFilterProps {
    stock: Stock,
    onChange: (event) => void;
}

export class StockFilter extends React.Component<StockFilterProps, any> {

    render() {
        return (
            <li className="itemFilter">
                <input type="checkbox" name={this.props.stock.name} defaultChecked={this.props.stock.visible} onChange={this.props.onChange}/>
                <label htmlFor={this.props.stock.name}>{this.props.stock.name}</label>
            </li>
        )
    }
}