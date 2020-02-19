import React from "react";
import "../../style/FiltersContainer.css"
import {Stock} from "../../types/Stock";

interface StockFilterProps {
    stock: Stock,
    onChange: (event) => void;
}

export class StockFilter extends React.Component<StockFilterProps, any> {

    render() {
        return (
            <li>
                <input type="checkbox" className="checkbox-filter" id={"checkbox-" + this.props.stock.name} checked={this.props.stock.visible} onChange={this.props.onChange}/>
                <label htmlFor={"checkbox-" + this.props.stock.name}>{this.props.stock.name}</label>
            </li>
        )
    }
}