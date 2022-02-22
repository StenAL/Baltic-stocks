import { FunctionComponent, useCallback } from "react";
import "../style/StockTableRow.css";
import { ColumnId, RenderedData } from "../types";

interface StockTableRowProps {
    stockDisplayValue: RenderedData;
    isAlternateRow: boolean; // for styling every second row
    renderedColumns: ColumnId[];
}

export const StockTableRow: FunctionComponent<StockTableRowProps> = ({
    stockDisplayValue,
    isAlternateRow,
    renderedColumns,
}) => {
    const getCellDisplayValue = useCallback((initialValue: number | string | undefined): string => {
        if (initialValue === undefined) return "-";
        return typeof initialValue === "number" ? initialValue.toFixed(2).toString() : initialValue;
    }, []);

    const getRowCells = useCallback((): JSX.Element[] => {
        return renderedColumns
            .map((columnId) => [columnId, stockDisplayValue[columnId]])
            .map(([columnId, columnValue]) => [columnId, getCellDisplayValue(columnValue)])
            .map(([columnId, columnValue]) => (
                <td
                    className={`tableCell ${
                        !isNaN(Number(columnValue)) || columnValue === "-" ? "right-align" : "left-align"
                    }`}
                    key={`${stockDisplayValue.isin}_${columnId}`}
                >
                    {columnValue}
                </td>
            ));
    }, [getCellDisplayValue, renderedColumns, stockDisplayValue]);
    const cells = getRowCells();
    return <tr className={isAlternateRow ? "alternateRow" : ""}>{cells}</tr>;
};
