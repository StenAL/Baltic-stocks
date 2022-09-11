import { FunctionComponent, useCallback, useMemo } from "react";
import "../style/HighlightedStats.css";
import { DEFAULT_DATA_YEAR } from "../App";
import { Stock } from "../types";
import { IndexType } from "../types";
import { useTranslation } from "react-i18next";

interface HighlightedStatsProps {
    stocks: Stock[];
    index: IndexType | undefined;
}

export const HighlightedStats: FunctionComponent<HighlightedStatsProps> = ({ stocks, index }) => {
    const { t } = useTranslation();

    const totalProfit = useMemo((): string => {
        let profit = stocks
            .map((s) => s.financialData)
            .flat()
            .filter((f) => f.year === DEFAULT_DATA_YEAR)
            .map((data) => data.netIncome)
            .reduce((acc, curr) => acc + curr, 0);
        profit = Math.round(profit) * 1_000_000;
        const formattedProfit = profit.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g); // group into sections of three (leading group can be shorter)
        if (!formattedProfit) {
            return "0";
        }
        return formattedProfit.join(" ");
    }, [stocks]);

    const getIndexInvestmentChange = useCallback(
        (initialMoney: number): string =>
            index ? ((index.changePercent / 100 + 1) * initialMoney).toFixed(2).toString() : "XXXX.XX",
        [index]
    );

    return (
        <div className="highlightContainer">
            <div className="highlightedStat">
                <h2>{ totalProfit }&nbsp;€</h2>
                <p>
                    {t("cumulative profit in year")} {DEFAULT_DATA_YEAR}
                </p>
            </div>
            <div className="highlightedStat">
                <h2>{getIndexInvestmentChange(1000)}&nbsp;€</h2>
                <p>{t("12 month index change")}</p>
            </div>
        </div>
    );
};
