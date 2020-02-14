import React from "react";

export class StockTableHeader extends React.Component<any, any> {
    render() {
        return (
            <tr>
                <th>Nimi</th>
                <th>ISIN</th>
                <th>12 kuu P/E</th>
            </tr>
        )
    }
}