import React from "react";
import {StockTableHead} from "./StockTableHead";
import {StockTableRow} from "./StockTableRow";
import "../style/StockTable.css"

interface StockTableProps {
    stocks: object[],
    columnTitles: string[],
    onHeaderClick: (event) => void,
}

export class StockTable extends React.Component<StockTableProps, any> {
    getTableRows = (stocks) => {
        return stocks.map(s => <StockTableRow stock={s} key={"stock_" + s.id}/>)
    };

    render() {
        const tableRows = this.getTableRows(this.props.stocks);
        return (
            <div>
                <table className="stockTable">
                    <thead>
                        <StockTableHead onHeaderClick={this.props.onHeaderClick} titles={this.props.columnTitles}/>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                <p>Andmed seisuga <span className={"refreshDate"}>08:00 18.02.2020</span></p>
            </div>
        ) // todo make date dynamic
    }
}