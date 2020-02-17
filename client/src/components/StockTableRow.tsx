import React from "react";
import "../style/StockTableRow.css"
import {Stock} from "../types/Stock";

interface StockTableRowProps {
    stock: Stock
}

export class StockTableRow extends React.Component<StockTableRowProps, any> {

    getRowCells = () => {
        const stock = this.props.stock;
        return Object.entries(stock)
            .filter(e => e[0] !== "id")
            .map(e => <td className="tableCell" key={stock.id + "_" + e[0]}>
                {e[1] === null ? "-" : e[1]}</td>)
    };

    render() {
        const cells = this.getRowCells();
        return (
            <tr>
                {cells}
            </tr>
        )
    }
}