import React from "react";
import "../../style/FiltersContainer.css";
import { Stock } from "../../types/Stock";

interface CountryFilterProps {
    country: string,
    stocks: Stock[],
    onChange: (event) => void;
}

export class CountryFilter extends React.Component<CountryFilterProps, object> {
    static countries = {
        EE: "Eesti",
        LV: "Läti",
        LT: "Leedu",
    };

    allCountryStocksVisible = () : boolean => this.props.stocks.filter(s => s.isin.startsWith(this.props.country))
        .some(s => s.visible);

    render() {
        return (
            <li>
            <input
                    type="checkbox" className="checkbox-filter" id={`checkbox-${this.props.country}`}
                checked={this.allCountryStocksVisible()} onChange={this.props.onChange}
              />
                <label htmlFor={`checkbox-${this.props.country}`}><b>{CountryFilter.countries[this.props.country]}</b></label>
          </li>
        );
    }
}
