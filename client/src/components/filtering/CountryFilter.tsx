import React from "react";
import "../../style/FiltersContainer.css"
import {Stock} from "../../types/Stock";

interface CountryFilterProps {
    country: string,
    stocks: Stock[],
    onChange: (event) => void;
}

export class CountryFilter extends React.Component<CountryFilterProps, any> {

    countries = {
        EE: "Eesti",
        LV: "Läti",
        LT: "Leedu"
    };

    allCountryStocksVisible = () => {
        return this.props.stocks.filter(s => s.isin.startsWith(this.props.country))
            .every(s => s.visible);
    };

    render() {
        return (
            <li>
                <input type="checkbox" className="checkbox-filter" id={"checkbox-" + this.props.country}
                       checked={this.allCountryStocksVisible()} onChange={this.props.onChange}/>
                <label htmlFor={"checkbox-" + this.props.country}><b>{this.countries[this.props.country]}</b></label>
            </li>
        )
    }
}