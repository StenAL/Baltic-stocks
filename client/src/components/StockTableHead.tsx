import { FunctionComponent, useCallback } from "react";
import "../style/StockTableHead.css";
import { useTranslation } from "react-i18next";
import { ColumnId } from "../types";

interface StockTableHeadProps {
    titles: ColumnId[];
    onHeaderClick: (columnId: ColumnId) => void;
    sortingBy: ColumnId | undefined;
    sortingOrder: "asc" | "desc";
}

export const StockTableHead: FunctionComponent<StockTableHeadProps> = ({
    titles,
    onHeaderClick,
    sortingBy,
    sortingOrder,
}) => {
    const { t } = useTranslation();
    const getHeaderClassName = useCallback(
        (title: ColumnId): string => {
            let className = "tableHeader";
            if (sortingBy === title) {
                className += ` ${sortingOrder}`;
            }
            return className;
        },
        [sortingBy, sortingOrder]
    );

    const generateTableHeaders = useCallback((): JSX.Element[] => {
        return titles.map((title) => (
            <th className={getHeaderClassName(title)} key={title} onClick={() => onHeaderClick(title)}>
                {t(title)}
            </th>
        ));
    }, [getHeaderClassName, onHeaderClick, t, titles]);
    return <tr>{generateTableHeaders()}</tr>;
};
