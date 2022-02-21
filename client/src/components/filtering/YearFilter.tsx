import React, { ChangeEvent, FunctionComponent } from "react";
import "../../style/FiltersContainer.css";

interface YearFilterProps {
    year: number;
    selected: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const YearFilter: FunctionComponent<YearFilterProps> = ({ year, selected, onChange }) => {
    return (
        <li>
            <input type="radio" className="radio-filter" id={`radio-${year}`} checked={selected} onChange={onChange} />
            <label htmlFor={`radio-${year}`}>{year}</label>
        </li>
    );
};
