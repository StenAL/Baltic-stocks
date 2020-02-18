import React from "react";
import "../style/StockTableHeader.css"

interface StockTableHeaderProps {
    titles: string[],
    onHeaderClick: (event) => void,
}

interface StockTableHeaderState {
    tableHeaders: object[],
}

export class StockTableHeader extends React.Component<StockTableHeaderProps, StockTableHeaderState> {

    constructor(props: StockTableHeaderProps) {
        super(props);
        const headers = this.props.titles.map(t => <th className={"tableHeader" + (t === 'Tiksuja' ? ' sorted' : '')} key={t} onClick={event => this.onClick(event, t)}>{t}</th>);
        this.state = {tableHeaders: headers}
    }

    onClick = (event, title) => {
        this.props.onHeaderClick(title);
        const newClass = event.target.className === "tableHeader sorted" ? "tableHeader reverseSorted" : "tableHeader sorted";
        const headers = this.props.titles.slice().map(t => <th className={t === title ? newClass : 'tableHeader'} key={t} onClick={event => this.onClick(event, t)}>{t}</th>);
        this.setState({tableHeaders: headers});
    };

    render() {
        return (
            <tr>
                {this.state.tableHeaders}
            </tr>
        )
    }
}