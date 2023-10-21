import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActionType, useDispatchContext } from "../Reducer";
import "../style/StockTableHead.css";
import { ColumnId } from "../types";

interface StockTableHeadProps {
    titles: ColumnId[];
    sortingBy: ColumnId | undefined;
    sortingOrder: "asc" | "desc";
}

export const StockTableHead: FunctionComponent<StockTableHeadProps> = ({ titles, sortingBy, sortingOrder }) => {
    const dispatch = useDispatchContext();
    const { t } = useTranslation();
    const getHeaderClassName = useCallback(
        (title: ColumnId): string => {
            let className = "tableHeader";
            if (sortingBy === title) {
                className += ` ${sortingOrder}`;
            }
            return className;
        },
        [sortingBy, sortingOrder],
    );

    const generateTableHeaders = useCallback((): JSX.Element[] => {
        return titles.map((title) => (
            <th
                className={getHeaderClassName(title)}
                key={title}
                onClick={() => dispatch({ type: ActionType.SORT_STOCKS, columnId: title })}
            >
                {t(title)}
            </th>
        ));
    }, [getHeaderClassName, t, titles, dispatch]);
    return <tr>{generateTableHeaders()}</tr>;
};
