import React from "react";
import { ColumnId, RenderedData } from "../types";
import StockTableHead from "./StockTableHead";
import { StockTableRow } from "./StockTableRow";
import "../style/StockTable.css";
import { WithTranslation, withTranslation } from "react-i18next";

interface StockTableProps extends WithTranslation {
    stockDisplayValues: RenderedData[];
    sortingBy: ColumnId | undefined;
    sortingOrder: "asc" | "desc";
    timeFetched: string;
    renderedColumns: ColumnId[];
    onHeaderClick: (columnId: ColumnId) => void;
}

class StockTable extends React.Component<StockTableProps> {
    getTableRows = (stocks: RenderedData[]): JSX.Element[] =>
        stocks.map((s, i) => (
            <StockTableRow
                renderedColumns={this.props.renderedColumns}
                alternateRow={i % 2 === 1}
                stockDisplayValue={s}
                key={`stock_${s.id}`}
            />
        ));

    render() {
        const tableRows = this.getTableRows(this.props.stockDisplayValues);
        const { t } = this.props;
        return (
            <div>
                <table className="stockTable">
                    <thead>
                        <StockTableHead
                            onHeaderClick={this.props.onHeaderClick}
                            titles={this.props.renderedColumns}
                            sortingOrder={this.props.sortingOrder}
                            sortingBy={this.props.sortingBy}
                        />
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
                <p>
                    {t("data as of")} <span className="refreshDate">{this.props.timeFetched}</span>
                </p>
            </div>
        );
    }
}

export default withTranslation()(StockTable);
