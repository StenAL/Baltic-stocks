import { FunctionComponent } from "react";
import "../../style/FiltersContainer.css";
import { ActionType, useDispatchContext } from "../../Reducer";

interface YearFilterProps {
    year: number;
    selected: boolean;
}

export const YearFilter: FunctionComponent<YearFilterProps> = ({ year, selected }) => {
    const dispatch = useDispatchContext();
    return (
        <li>
            <input
                type="radio"
                className="radio-filter"
                id={`radio-${year}`}
                checked={selected}
                onChange={() => dispatch({ type: ActionType.SELECT_YEAR, year: year })}
            />
            <label htmlFor={`radio-${year}`}>{year}</label>
        </li>
    );
};
