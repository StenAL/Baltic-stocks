import React from "react";
import "../style/StockTableHeader.css"

interface StockTableHeaderProps {
    titles: string[]
}

export class StockTableHeader extends React.Component<StockTableHeaderProps, any> {
    getTableHeaders = () => {
        return this.props.titles.map(t => <th className="tableHeader" key={t}>{t}</th>)
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