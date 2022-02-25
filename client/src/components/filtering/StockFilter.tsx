import { FunctionComponent } from "react";
import { ActionType, useDispatchContext } from "../../Reducer";
import "../../style/FiltersContainer.css";
import { Stock } from "../../types";

interface StockFilterProps {
    stock: Stock;
}

export const StockFilter: FunctionComponent<StockFilterProps> = ({ stock }) => {
    const dispatch = useDispatchContext();
    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${stock.name}`}
                checked={stock.visible}
                onChange={() => dispatch({ type: ActionType.INVERT_STOCK_VISIBILITY, isin: stock.isin })}
            />
            <label htmlFor={`checkbox-${stock.name}`}>{stock.name}</label>
        </li>
    );
};
