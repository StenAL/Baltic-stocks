import React from "react";
import "../../style/FiltersContainer.css"

interface YearFilterProps {
    year: number,
    selected: boolean,
    onChange: (event) => void;
}

export class YearFilter extends React.Component<YearFilterProps, object> {

    render() {
        return (
            <li>
                <input type="radio" className="radio-filter" id={"radio-" + this.props.year} checked={this.props.selected} onChange={this.props.onChange}/>
                <label htmlFor={"radio-" + this.props.year}>{this.props.year}</label>
            </li>
        );
    }
}