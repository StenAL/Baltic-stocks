import React from "react";
import "../style/StockTableHead.css"

interface StockTableHeadProps {
    titles: string[],
    onHeaderClick: (event) => void,
}

interface StockTableHeadState {
    tableHeaders: JSX.Element[], // tableHeaders are kept in state to keep track which direction table is sorted in to apply appropriate styling
}

export class StockTableHead extends React.Component<StockTableHeadProps, StockTableHeadState> {

    constructor(props: StockTableHeadProps) {
        super(props);
        const headers = this.props.titles.map(t => <th className={"tableHeader" + (t === 'Tiksuja' ? ' sorted' : '')}
                                                       key={t} onClick={event => this.onClick(event, t)}>{t}</th>);
        this.state = {tableHeaders: headers}
    }

    onClick = (event, title) : void => {
        this.props.onHeaderClick(title);
        const newClass : string = event.target.className === "tableHeader sorted" ? "tableHeader reverseSorted" : "tableHeader sorted";
        const headers = this.state.tableHeaders.slice()
            .map(t => t.props.children)
            .map(t => <th className={t === title ? newClass : 'tableHeader'} key={t}
                          onClick={event => this.onClick(event, t)}>{t}</th>);
        this.setState({tableHeaders: headers});
    };

    generateTableHeaders = () : JSX.Element[] => {
        return this.state.tableHeaders
            .filter(t => this.props.titles.includes(t.props.children)) // JSX.Element.props.children resolves to value of text inside element
                                                                       // this checks if the currently displayed column titles includes a tableHeader's text
    };

    render() {
        return (
            <tr>
                {this.generateTableHeaders()}
            </tr>
        );
    }
}