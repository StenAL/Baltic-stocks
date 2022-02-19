import React from "react";
import "../../style/FiltersContainer.css";
import { Stock } from "../../types";
import { WithTranslation, withTranslation } from "react-i18next";

interface CountryFilterProps extends WithTranslation {
    country: string;
    stocks: Stock[];
    onChange: (event) => void;
}

class CountryFilter extends React.Component<CountryFilterProps, object> {
    allCountryStocksVisible = (): boolean =>
        this.props.stocks
            .filter((s) => s.isin.startsWith(this.props.country))
            .some((s) => s.visible);

    render() {
        const { t } = this.props;
        return (
            <li>
                <input
                    type="checkbox"
                    className="checkbox-filter"
                    id={`checkbox-${this.props.country}`}
                    checked={this.allCountryStocksVisible()}
                    onChange={this.props.onChange}
                />
                <label htmlFor={`checkbox-${this.props.country}`}>
                    <b>{t(this.props.country)}</b>
                </label>
            </li>
        );
    }
}

export default withTranslation()(CountryFilter);
