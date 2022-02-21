import React, { ChangeEvent, FunctionComponent } from "react";
import "../../style/FiltersContainer.css";
import { Stock } from "../../types";

interface StockFilterProps {
    stock: Stock;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const StockFilter: FunctionComponent<StockFilterProps> = ({ stock, onChange }) => {
    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${stock.name}`}
                checked={stock.visible}
                onChange={onChange}
            />
            <label htmlFor={`checkbox-${stock.name}`}>{stock.name}</label>
        </li>
    );
};
