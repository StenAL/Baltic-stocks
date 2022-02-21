import React, { FunctionComponent, useCallback } from "react";
import { ColumnId, RenderedData } from "../types";
import { StockTableHead } from "./StockTableHead";
import { StockTableRow } from "./StockTableRow";
import "../style/StockTable.css";
import { useTranslation } from "react-i18next";

interface StockTableProps {
    stockDisplayValues: RenderedData[];
    sortingBy: ColumnId | undefined;
    sortingOrder: "asc" | "desc";
    timeFetched: string;
    renderedColumns: ColumnId[];
    onHeaderClick: (columnId: ColumnId) => void;
}

export const StockTable: FunctionComponent<StockTableProps> = ({
    stockDisplayValues,
    sortingBy,
    sortingOrder,
    timeFetched,
    renderedColumns,
    onHeaderClick,
}) => {
    const { t } = useTranslation();
    const getTableRows = useCallback(
        (stocks: RenderedData[]): JSX.Element[] =>
            stocks.map((s, i) => (
                <StockTableRow
                    renderedColumns={renderedColumns}
                    isAlternateRow={i % 2 === 1}
                    stockDisplayValue={s}
                    key={`stock_${s.id}`}
                />
            )),
        [renderedColumns]
    );
    const tableRows = getTableRows(stockDisplayValues);
    return (
        <div>
            <table className="stockTable">
                <thead>
                    <StockTableHead
                        onHeaderClick={onHeaderClick}
                        titles={renderedColumns}
                        sortingOrder={sortingOrder}
                        sortingBy={sortingBy}
                    />
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <p>
                {t("data as of")} <span className="refreshDate">{timeFetched}</span>
            </p>
        </div>
    );
};
