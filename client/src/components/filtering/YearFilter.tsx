import React, { ChangeEvent } from "react";
import "../../style/FiltersContainer.css";

interface YearFilterProps {
    year: number;
    selected: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class YearFilter extends React.Component<YearFilterProps> {
    render() {
        return (
            <li>
                <input
                    type="radio"
                    className="radio-filter"
                    id={`radio-${this.props.year}`}
                    checked={this.props.selected}
                    onChange={this.props.onChange}
                />
                <label htmlFor={`radio-${this.props.year}`}>
                    {this.props.year}
                </label>
            </li>
        );
    }
}
