import React from "react";
import "../style/StockTableRow.css";
import { Stock } from "../types";

interface StockTableRowProps {
    stockDisplayValue: Stock;
    alternateRow: boolean; // for styling every second row
}

export class StockTableRow extends React.Component<StockTableRowProps, object> {
    getRowCells = (): JSX.Element[] => {
        const { stockDisplayValue } = this.props;
        return Object.entries(stockDisplayValue)
            .filter((e) => e[0] !== "id") // don't display id column's value
            .map((e) => (
                <td
                    className={`tableCell ${
                        Number.isFinite(e[1]) || e[1] === null
                            ? "right-align"
                            : "left-align"
                    }`} // right-align numbers and nulls
                    key={`${stockDisplayValue.id}_${e[0]}`}
                >
                    {this.getCellDisplayValue(e[1])}
                </td>
            ));
    };

    getCellDisplayValue = (initialValue): string => {
        if (initialValue === null) return "-";
        return Number.isFinite(initialValue)
            ? initialValue.toFixed(2).toString()
            : initialValue;
    };

    render() {
        const cells = this.getRowCells();
        return (
            <tr className={this.props.alternateRow ? "alternateRow" : ""}>
                {cells}
            </tr>
        );
    }
}
