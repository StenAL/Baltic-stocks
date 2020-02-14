import React from "react";

import {Stock} from "../types/Stock";

interface StockTableRowProps {
    stock: Stock
}

export class StockTableRow extends React.Component<StockTableRowProps, any> {
    render() {
        const stock = this.props.stock;
        return (
            <tr>
                <td>{stock.name}</td>
                <td>{stock.isin}</td>
                <td>{stock.keyStats.priceEarningTtm}</td>
            </tr>
        )
    }
}