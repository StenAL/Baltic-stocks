import React from "react";
import {StockTableHead} from "./StockTableHead";
import {StockTableRow} from "./StockTableRow";
import "../style/StockTable.css"

interface StockTableProps {
    stockDisplayValues: object[],
    sortingBy: string,
    sortingOrder: ("asc" | "desc"),
    columnTitles: string[],
    onHeaderClick: (event) => void,
}

export class StockTable extends React.Component<StockTableProps, object> {
    getTableRows = (stocks) : JSX.Element[] => {
        return stocks.map((s, i) => <StockTableRow alternateRow={i % 2 === 0} stockDisplayValue={s} key={"stock_" + s.id}/>)
    };

    render() {
        const tableRows = this.getTableRows(this.props.stockDisplayValues);
        return (
            <div>
                <table className="stockTable">
                    <thead>
                        <StockTableHead onHeaderClick={this.props.onHeaderClick} titles={this.props.columnTitles}
                                        sortingOrder={this.props.sortingOrder} sortingBy={this.props.sortingBy}
                        />
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                <p>Andmed seisuga <span className={"refreshDate"}>08:00 18.02.2020</span></p>
            </div>
        ); // todo make date dynamic
    }
}