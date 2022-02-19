import React from "react";
import "../../style/FiltersContainer.css";
import { WithTranslation, withTranslation } from "react-i18next";
import { Column } from "../../types";

interface ColumnFilterProps extends WithTranslation {
    column: Column;
    onChange: (event) => void;
}

class ColumnFilter extends React.Component<ColumnFilterProps, object> {
    render() {
        const a = 5;
        const { t } = this.props;
        return (
            <li>
                <input
                    type="checkbox"
                    className="checkbox-filter"
                    id={`checkbox-${this.props.column.title}`}
                    checked={this.props.column.visible}
                    onChange={this.props.onChange}
                />
                <label htmlFor={`checkbox-${this.props.column.title}`}>
                    {t(this.props.column.title)}
                </label>
            </li>
        );
    }
}

export default withTranslation()(ColumnFilter);
