import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ActionType, useDispatchContext } from "../../Reducer";
import "../../style/FiltersContainer.css";
import { CountryCode, Stock } from "../../types";

interface CountryFilterProps {
    countryCode: CountryCode;
    stocks: Stock[];
}

export const CountryFilter: FunctionComponent<CountryFilterProps> = ({ countryCode, stocks }) => {
    const { t } = useTranslation();
    const dispatch = useDispatchContext();
    const anyStocksVisible = stocks.some((s) => s.visible);

    return (
        <li>
            <input
                type="checkbox"
                className="checkbox-filter"
                id={`checkbox-${countryCode}`}
                checked={anyStocksVisible}
                onChange={() =>
                    dispatch({
                        type: ActionType.TOGGLE_COUNTRY_STOCKS,
                        countryCode: countryCode,
                        visible: !anyStocksVisible,
                    })
                }
            />
            <label htmlFor={`checkbox-${countryCode}`}>
                <b>{t(countryCode)}</b>
            </label>
        </li>
    );
};
