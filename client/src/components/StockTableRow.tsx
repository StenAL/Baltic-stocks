import React from "react";
import "../style/StockTableRow.css"
import {Stock} from "../types/Stock";

interface StockTableRowProps {
    stock: Stock
}

export class StockTableRow extends React.Component<StockTableRowProps, any> {

    getRowCells = () => {
        const stock = this.props.stock;
        return Object.entries(stock).map(e => <td className="tableCell" key={stock.id}>{e[1] === null ? "-" : e[1]}</td>)
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