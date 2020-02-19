import React from "react";
import "../style/HighlightedStats.css"
import {Stock} from "../types/Stock";

interface HighlightedStatsProps {
    stocks: Stock[],
}

export class HighlightedStats extends React.Component<HighlightedStatsProps, any> {

    getTotalProfitString = () => {
        const stocks = this.props.stocks;
        let profit =  stocks.map(s => s.financialData.slice(-1).pop())
            .flat()
            .filter(f => f.year === 2018)
            .map(data => data.netIncome)
            .reduce((acc, curr) => acc + curr, 0);
        profit = Math.round(profit) * 1000000;
        let profitString = profit.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
        profitString = profitString == null ? ["0"] : profitString;
        return profitString.join(" ");
    };

    render() {
        return (
            <div className={"highlightContainer"}>
                <div className={"highlightedStat"}>
                    <h2>{this.getTotalProfitString()} €</h2>
                    <p>Balti põhinimekirja ettevõtete viimase 12 kuu kasum</p>
                </div>
                <div className={"highlightedStat"}>
                    <h2>{"1300"} €</h2>
                    <p>mingi lahe näitaja läheb siia</p>
                </div>
            </div>
        );
    }
}