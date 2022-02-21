import React, { ChangeEvent, FunctionComponent, useCallback } from "react";
import "../../style/FiltersContainer.css";
import { Stock } from "../../types";
import { useTranslation } from "react-i18next";

interface CountryFilterProps {
    country: string;
    stocks: Stock[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CountryFilter: FunctionComponent<CountryFilterProps> = ({ country, stocks, onChange }) => {
    const { t } = useTranslation();
    const allCountryStocksVisible = useCallback(
        (): boolean => stocks.filter((s) => s.isin.startsWith(country)).some((s) => s.visible),
        [country, stocks]
    );

    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${country}`}
                checked={allCountryStocksVisible()}
                onChange={onChange}
            />
            <label htmlFor={`checkbox-${country}`}>
                <b>{t(country)}</b>
            </label>
        </li>
    );
};
