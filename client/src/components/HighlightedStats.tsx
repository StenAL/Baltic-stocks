import React from "react";
import "../style/HighlightedStats.css";
import {Stock} from "../types/Stock";
import {IndexType} from "../types/IndexType";
import {WithTranslation, withTranslation} from 'react-i18next';

interface HighlightedStatsProps extends WithTranslation {
    stocks: Stock[],
    index: IndexType,
}

class HighlightedStats extends React.Component<HighlightedStatsProps, object> {
    getTotalProfitString = (): string => {
        const {stocks} = this.props;
        let profit = stocks
            .map(s => s.financialData.slice(-1).pop())
            .flat()
            .filter(f => f.year === 2018)
            .map(data => data.netIncome)
            .reduce((acc, curr) => acc + curr, 0);
        profit = Math.round(profit) * 1000000;
        let profitString = profit.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
        profitString = profitString == null ? ["0"] : profitString;
        return profitString.join(" ");
    };

    getIndexInvestmentChange = (base: number): string => (((this.props.index.changePercent) / 100 + 1) * base)
        .toFixed(2).toString();

    render() {
        const { t } = this.props;
        return (
            <div className="highlightContainer">
                <div className="highlightedStat">
                    <h2>
                        {this.getTotalProfitString() + " "}
                        €
                    </h2>
                    <p>{t('12 month profit')}</p>
                </div>
                <div className="highlightedStat">
                    <h2>
                        {this.getIndexInvestmentChange(1000) + " "}
                        €
                    </h2>
                    <p>{t('12 month index change')}</p>
                </div>
            </div>
        );
    }
}

export default withTranslation()(HighlightedStats);
