import React from "react";
import "../style/StockTableRow.css";
import { ColumnId, RenderedData } from "../types";

interface StockTableRowProps {
    stockDisplayValue: RenderedData;
    alternateRow: boolean; // for styling every second row
    renderedColumns: (ColumnId)[]
}

export class StockTableRow extends React.Component<StockTableRowProps, object> {
    getRowCells = (): JSX.Element[] => {
        const { stockDisplayValue, renderedColumns } = this.props;
        return renderedColumns
            .map(columnId => [columnId, stockDisplayValue[columnId]])
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
