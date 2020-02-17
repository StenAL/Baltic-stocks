import React from "react";
import {StockTableHeader} from "./StockTableHeader";
import {StockTableRow} from "./StockTableRow";
import "../style/StockTable.css"

interface StockTableProps {
    stocks: object[],
    columnTitles: string[],
}

export class StockTable extends React.Component<StockTableProps, any> {
    getTableRows = (stocks) => {
        return stocks.map(s => <StockTableRow stock={s} key={"stock_" + s.id}/>)
    };

    render() {
        const tableRows = this.getTableRows(this.props.stocks);
        return (
            <table className="stockTable">
                <thead>
                    <StockTableHeader titles={this.props.columnTitles}/>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }
}