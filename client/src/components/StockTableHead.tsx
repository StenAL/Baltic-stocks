import React from "react";
import "../style/StockTableHead.css";
import { WithTranslation, withTranslation } from "react-i18next";
import { ColumnId } from "../types";

interface StockTableHeadProps extends WithTranslation {
    titles: ColumnId[];
    onHeaderClick: (columnId: ColumnId) => void;
    sortingBy: string;
    sortingOrder: "asc" | "desc";
}

class StockTableHead extends React.Component<StockTableHeadProps> {
    getHeaderClassName = (title: string): string => {
        let className = "tableHeader";
        if (this.props.sortingBy === title) {
            className += ` ${this.props.sortingOrder}`;
        }
        return className;
    };

    generateTableHeaders = (): JSX.Element[] => {
        const { t } = this.props;
        return this.props.titles.map((title) => (
            <th className={this.getHeaderClassName(title)} key={title} onClick={() => this.props.onHeaderClick(title)}>
                {t(title)}
            </th>
        ));
    };

    render() {
        return <tr>{this.generateTableHeaders()}</tr>;
    }
}

export default withTranslation()(StockTableHead);
