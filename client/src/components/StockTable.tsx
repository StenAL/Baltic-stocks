import React from "react";
import {StockTableHeader} from "./StockTableHeader";
import {StockTableRow} from "./StockTableRow";
import {Stock} from "../types/Stock";
import "../style/StockTable.css"

interface StockTableProps {
    stocks: Stock[],
}

export class StockTable extends React.Component<StockTableProps, any> {
    getTableRows = (stocks: Stock[]) => {
        return stocks.map(s => <StockTableRow stock={s} key={s.isin}/>)
    };

    render() {
        const tableRows = this.getTableRows(this.props.stocks);
        return (
            <table className="stockTable">
                <thead>
                    <StockTableHeader/>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }
}