import React from "react";
import "../style/StockTableRow.css";
import { ColumnId, RenderedData } from "../types";

interface StockTableRowProps {
    stockDisplayValue: RenderedData;
    alternateRow: boolean; // for styling every second row
    renderedColumns: ColumnId[];
}

export class StockTableRow extends React.Component<StockTableRowProps> {
    getRowCells = (): JSX.Element[] => {
        const { stockDisplayValue, renderedColumns } = this.props;
        return renderedColumns
            .map((columnId) => [columnId, stockDisplayValue[columnId]])
            .map(([columnId, columnValue]) => [columnId, this.getCellDisplayValue(columnValue)])
            .map(([columnId, columnValue]) => (
                <td
                    className={`tableCell ${
                        !isNaN(Number(columnValue)) || columnValue === "-" ? "right-align" : "left-align"
                    }`} // right-align numbers and missing values
                    key={`${stockDisplayValue.id}_${columnId}`}
                >
                    {columnValue}
                </td>
            ));
    };

    getCellDisplayValue = (initialValue: number | string | undefined): string => {
        if (initialValue === undefined) return "-";
        return typeof initialValue === "number" ? initialValue.toFixed(2).toString() : initialValue;
    };

    render() {
        const cells = this.getRowCells();
        return <tr className={this.props.alternateRow ? "alternateRow" : ""}>{cells}</tr>;
    }
}
