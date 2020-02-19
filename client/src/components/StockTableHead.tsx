import React, {ReactElement} from "react";
import "../style/StockTableHead.css"

interface StockTableHeadProps {
    titles: string[],
    onHeaderClick: (event) => void,
}

interface StockTableHeadState {
    tableHeaders: ReactElement[],
}

export class StockTableHead extends React.Component<StockTableHeadProps, StockTableHeadState> {

    constructor(props: StockTableHeadProps) {
        super(props);
        const headers = this.props.titles.map(t => <th className={"tableHeader" + (t === 'Tiksuja' ? ' sorted' : '')}
                                                       key={t} onClick={event => this.onClick(event, t)}>{t}</th>);
        this.state = {tableHeaders: headers}
    }

    onClick = (event, title) => {
        this.props.onHeaderClick(title);
        const newClass = event.target.className === "tableHeader sorted" ? "tableHeader reverseSorted" : "tableHeader sorted";
        const headers = this.state.tableHeaders.slice()
            .map(t => t.props.children)
            .map(t => <th className={t === title ? newClass : 'tableHeader'} key={t}
                          onClick={event => this.onClick(event, t)}>{t}</th>);
        this.setState({tableHeaders: headers});
    };

    generateTableHeaders = () => {
        return this.state.tableHeaders.filter(t => this.props.titles.includes(t.props.children))
    };

    render() {
        return (
            <tr>
                {this.generateTableHeaders()}
            </tr>
        )
    }
}