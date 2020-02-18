import React from "react";
import "../style/StockTableHeader.css"

interface StockTableHeaderProps {
    titles: string[],
    onHeaderClick: (event) => void,
}

export class StockTableHeader extends React.Component<StockTableHeaderProps, any> {

    onClick = (event, title) => {
        this.props.onHeaderClick(title);
        if (event.target.className === "tableHeader sorted") {
            event.target.className = "tableHeader reverseSorted";
        } else {
            event.target.className = "tableHeader sorted";
        }
    };

    getTableHeaders = () => {
        return this.props.titles.map(t => <th className={"tableHeader" + (t === 'Tiksuja' ? ' sorted' : '')} key={t} onClick={event => this.onClick(event, t)}>{t}</th>)
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