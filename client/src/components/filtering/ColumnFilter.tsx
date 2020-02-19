import React from "react";
import "../../style/FiltersContainer.css"
import {Column} from "../../types/Column";

interface ColumnFilterProps {
    column: Column,
    onChange: (event) => void;
}

export class ColumnFilter extends React.Component<ColumnFilterProps, any> {

    render() {
        return (
            <li>
                <input type="checkbox" className="checkbox-filter" id={"checkbox-" + this.props.column.name} checked={this.props.column.visible} onChange={this.props.onChange}/>
                <label htmlFor={"checkbox-" + this.props.column.name}>{this.props.column.name}</label>
            </li>
        )
    }
}