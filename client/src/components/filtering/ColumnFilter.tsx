import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "../../style/FiltersContainer.css";
import { ActionType, useDispatchContext } from "../../Reducer";
import { Column } from "../../types";

interface ColumnFilterProps {
    column: Column;
}

export const ColumnFilter: FunctionComponent<ColumnFilterProps> = ({ column }) => {
    const { t } = useTranslation();
    const dispatch = useDispatchContext();
    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${column.title}`}
                checked={column.visible}
                onChange={() => dispatch({ type: ActionType.TOGGLE_COLUMN_VISIBILITY, columnId: column.title })}
            />
            <label htmlFor={`checkbox-${column.title}`}>{t(column.title)}</label>
        </li>
    );
};
