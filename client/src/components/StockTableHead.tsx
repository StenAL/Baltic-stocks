import React from "react";
import "../style/StockTableHead.css";

interface StockTableHeadProps {
    titles: string[],
    onHeaderClick: (event) => void,
    sortingBy: string,
    sortingOrder: ("asc" | "desc"),
}

export class StockTableHead extends React.Component<StockTableHeadProps, object> {
   getHeaderClassName = (title : string) : string => {
       let className = "tableHeader";
       if (this.props.sortingBy === title) {
           className += ` ${this.props.sortingOrder}`;
       }
       return className;
   };

    generateTableHeaders = () : JSX.Element[] => this.props.titles.map(t => (
      <th
          className={this.getHeaderClassName(t)}
          key={t} onClick={() => this.props.onHeaderClick(t)}
        >{t}
        </th>
    ));

    render() {
        return (
            <tr>
                {this.generateTableHeaders()}
          </tr>
        );
    }
}
