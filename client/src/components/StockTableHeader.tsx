import React from "react";
import "../style/StockTableHeader.css"

interface StockTableHeaderProps {
    titles: string[],
    onHeaderClick: (event) => void,
}

export class StockTableHeader extends React.Component<StockTableHeaderProps, any> {

    getTableHeaders = () => {
        return this.props.titles.map(t => <th className="tableHeader" key={t} onClick={event => this.props.onHeaderClick(t)}>{t}</th>)
    };

    render() {
        const headers = this.getTableHeaders();
        return (
            <tr>
                {headers}
            </tr>
        )
    }
}