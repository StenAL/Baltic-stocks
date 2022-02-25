import { FunctionComponent, useCallback } from "react";
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
}

export const StockTable: FunctionComponent<StockTableProps> = ({
    stockDisplayValues,
    sortingBy,
    sortingOrder,
    timeFetched,
    renderedColumns,
}) => {
    const { t } = useTranslation();
    const getTableRows = useCallback(
        (stocks: RenderedData[]): JSX.Element[] =>
            stocks.map((s, i) => (
                <StockTableRow
                    renderedColumns={renderedColumns}
                    isAlternateRow={i % 2 === 1}
                    stockDisplayValue={s}
                    key={`stock_${s.isin}`}
                />
            )),
        [renderedColumns]
    );
    const tableRows = getTableRows(stockDisplayValues);
    return (
        <div>
            <table className="stockTable">
                <thead>
                    <StockTableHead titles={renderedColumns} sortingOrder={sortingOrder} sortingBy={sortingBy} />
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <p>
                {t("data as of")} <span className="refreshDate">{timeFetched}</span>
            </p>
        </div>
    );
};
