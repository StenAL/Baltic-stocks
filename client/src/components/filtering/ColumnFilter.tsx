import React, { ChangeEvent, FunctionComponent } from "react";
import "../../style/FiltersContainer.css";
import { useTranslation } from "react-i18next";
import { Column } from "../../types";

interface ColumnFilterProps {
    column: Column;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ColumnFilter: FunctionComponent<ColumnFilterProps> = ({ column, onChange }) => {
    const { t } = useTranslation();
    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${column.title}`}
                checked={column.visible}
                onChange={onChange}
            />
            <label htmlFor={`checkbox-${column.title}`}>{t(column.title)}</label>
        </li>
    );
};
