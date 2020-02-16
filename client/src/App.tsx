import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import {Header} from "./components/Header";
import {StockTable} from "./components/StockTable";
import "./style/App.css"
import {Column} from "./types/Column";

interface AppState {
    stocks: Stock[];
    columns: Column[]
}

export default class App extends Component<object, AppState> {
    constructor(props: any) {
        super(props);
        this.titles = {
            id: "id -- this should never be seen",
            ticker: "Ticker",
            name: "Nimi",
            isin: "ISIN",
            priceEarningTtm: "12 kuu P/E",
            priceBook: "P/B",
            priceSalesTtm: "12 kuu P/S",
            revenueGrowthThreeYearAvg: "3 aasta keskmise tulu kasv",
            epsGrowthThreeYearAvg: "3 aasta keskmise EPS kasv",
            operatingMarginTtm: "12 kuu operating margin",
            netMarginTtm: "12 kuu net margin",
            roeTtm: "12 kuu ROE",
            debtEquity: "Debt/Equity",
        };
        const columns = Object.entries(this.titles).map(title => ({title: title[0], visible: true, name: title[1]}));
        columns[0].visible = false; // don't show id
        this.state = {stocks: [], columns: columns};

    }

    titles: object = {};

    componentDidMount(): void {
        fetch("http://localhost:12345/stocks")
            .then(res => res.json())
            .then((data) => {
                const stocks = data.map((d: Stock) => ({...d, visible: true}));
                this.setState({stocks: stocks})
            })
            .catch(e => console.log(e));
    }

    getStockDisplayedData = (s: Stock) => {
        const copy = Object.assign({}, s);
        Object.assign(copy, s.keyStats);
        // TODO display dividends and yearly financial results (in a separate table?)
        Object.keys(copy).filter(k => !(k in this.titles)).forEach(k => delete copy[k]);
        this.state.columns.filter(c => !c.visible).map(c => c.title).forEach(k => delete copy[k]);
        return copy;
    };

    render() {
        const visibleStocks = this.state.stocks.map(s => this.getStockDisplayedData(s));
        const visibleColumns = this.state.columns.filter(c => c.visible).map(c => c.name);
        return (
            <div className="App">
                <Header/>
                <StockTable stocks={visibleStocks} columnTitles={visibleColumns}/>
            </div>
        );
    }

}