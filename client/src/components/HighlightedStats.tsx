import React, { FunctionComponent, useCallback } from "react";
import "../style/HighlightedStats.css";
import { Stock } from "../types";
import { IndexType } from "../types";
import { useTranslation } from "react-i18next";

interface HighlightedStatsProps {
    stocks: Stock[];
    index: IndexType | undefined;
}

export const HighlightedStats: FunctionComponent<HighlightedStatsProps> = ({ stocks, index }) => {
    const { t } = useTranslation();

    const getTotalProfitString = useCallback((): string => {
        let profit = stocks
            .map((s) => s.financialData)
            .flat()
            .filter((f) => f.year === 2019)
            .map((data) => data.netIncome)
            .reduce((acc, curr) => acc + curr, 0);
        profit = Math.round(profit) * 1000000;
        const profitString = profit.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
        if (!profitString) {
            return "0";
        }
        return profitString.join(" ");
    }, [stocks]);

    const getIndexInvestmentChange = useCallback(
        (initialMoney: number): string =>
            index ? ((index.changePercent / 100 + 1) * initialMoney).toFixed(2).toString() : "XXXX.XX",
        [index]
    );

    return (
        <div className="highlightContainer">
            <div className="highlightedStat">
                <h2>{getTotalProfitString() + " "}€</h2>
                <p>{t("2019 profit")}</p>
            </div>
            <div className="highlightedStat">
                <h2>{getIndexInvestmentChange(1000) + " "}€</h2>
                <p>{t("12 month index change")}</p>
            </div>
        </div>
    );
};
