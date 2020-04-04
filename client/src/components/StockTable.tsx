import React from "react";
import StockTableHead from "./StockTableHead";
import {StockTableRow} from "./StockTableRow";
import "../style/StockTable.css";
import {WithTranslation, withTranslation} from "react-i18next";

interface StockTableProps extends WithTranslation {
    stockDisplayValues: object[],
    sortingBy: string,
    sortingOrder: ("asc" | "desc"),
    timeFetched,
    columnTitles: string[],
    onHeaderClick: (event) => void,
}

class StockTable extends React.Component<StockTableProps, object> {
    getTableRows = (stocks): JSX.Element[] => stocks.map((s, i) => <StockTableRow alternateRow={i % 2 === 1}
                                                                                  stockDisplayValue={s}
                                                                                  key={`stock_${s.id}`}/>);

    render() {
        const tableRows = this.getTableRows(this.props.stockDisplayValues);
        const {t} = this.props;
        return (
            <div>
                <table className="stockTable">
                    <thead>
                    <StockTableHead
                        onHeaderClick={this.props.onHeaderClick} titles={this.props.columnTitles}
                        sortingOrder={this.props.sortingOrder} sortingBy={this.props.sortingBy}
                    />
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
                <p>
                    {t('data as of')} <span className="refreshDate">{this.props.timeFetched}</span>
                </p>
            </div>
        );
    }
}

export default withTranslation()(StockTable);
