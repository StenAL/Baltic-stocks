import React from "react";
import "../style/StockTableRow.css"
import {Stock} from "../types/Stock";

interface StockTableRowProps {
    stock: Stock,
    alternateRow: boolean,
}

export class StockTableRow extends React.Component<StockTableRowProps, any> {

    getRowCells = () => {
        const stock = this.props.stock;
        return Object.entries(stock)
            .filter(e => e[0] !== "id")
            .map(e => <td className={"tableCell " + (Number.isFinite(e[1]) || e[1] === null ? "right-align" : "left-align")}
                          key={stock.id + "_" + e[0]}>{this.getCellDisplayValue(e[1])}</td>)
    };

    getCellDisplayValue = (initalValue) => {
        if (initalValue === null) return "-";
        return Number.isFinite(initalValue) ? initalValue.toFixed(2) : initalValue;
    };

    render() {
        const cells = this.getRowCells();
        return (
            <tr className={this.props.alternateRow ? "alternateRow" : ""}>
                {cells}
            </tr>
        )
    }
}