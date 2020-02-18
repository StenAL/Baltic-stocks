import "./style/App.css"
import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import {Header} from "./components/Header";
import {StockTable} from "./components/StockTable";
import {Column} from "./types/Column";
import {FiltersContainer} from "./components/FiltersContainer";
import {HighlightedStats} from "./components/HighlightedStats";
import {Footer} from "./components/Footer";

interface AppState {
    stocks: Stock[],
    columns: Column[],
    sortingStocksBy: string,
}

export default class App extends Component<object, AppState> {
    constructor(props: any) {
        super(props);
        this.titles = {
            id: "id -- this should never be seen",
            ticker: "Tiksuja",
            name: "Nimi",
            isin: "ISIN",
            priceEarningTtm: "12 kuu P/E",
            priceBook: "P/B",
            priceSalesTtm: "12 kuu P/S",
            revenueGrowthThreeYearAvg: "3 aasta keskmise tulu kasv",
            operatingMarginTtm: "12 kuu operating margin",
            netMarginTtm: "12 kuu net margin",
            roeTtm: "12 kuu ROE",
            debtEquity: "Debt/Equity",
        };
        const columns = Object.entries(this.titles).map(title => ({title: title[0], visible: true, name: title[1]}));
        columns[0].visible = false; // don't show id
        this.state = {stocks: [], columns: columns, sortingStocksBy: "ticker"};

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

    getStockDisplayedData = (stock: Stock) => {
        const copy = Object.assign({}, stock);
        Object.assign(copy, stock.keyStats);
        // TODO display dividends and yearly financial results (popup in a separate table?)
        Object.keys(copy).filter(k => !(k in this.titles)).forEach(k => delete copy[k]);
        this.state.columns.filter(c => !c.visible && c.title !== "id").map(c => c.title).forEach(k => delete copy[k]);
        return copy;
    };

    invertColumnVisibility = (event) => {
        const columns = this.state.columns.map(col => col.name === event.target.name ? {...col, visible: !col.visible} : col);
        this.setState({columns: columns});
    };

    invertStockVisibility = (event) => {
        const stocks = this.state.stocks.map(stock => stock.name === event.target.name ? {...stock, visible: !stock.visible} : stock);
        this.setState({stocks: stocks});
    };

    sortByAttribute = (columnTitle) => {
        const stocks = this.state.stocks.slice();
        const attribute = Object.entries(this.titles).filter(e => e[1] === columnTitle).map(e => e[0])[0];
        if (attribute === this.state.sortingStocksBy) {
            this.setState({stocks: stocks.reverse()});
        } else {
            let sortedStocks : Stock[] = stocks
                .filter(s => s.keyStats[attribute] !== null)
                .sort((a, b) => {
                    const aAttribute = a[attribute] ? a[attribute] : "";
                    const bAttribute = b[attribute] ? b[attribute] : "";
                    return a.keyStats[attribute] - b.keyStats[attribute] || aAttribute.localeCompare(bAttribute)
                });
            sortedStocks = [...stocks.filter(s => s.keyStats[attribute] === null), ...sortedStocks];
            this.setState({stocks: sortedStocks, sortingStocksBy: attribute})
        }
    };

    render() {
        const visibleStocksData = this.state.stocks
            .filter(s => s.visible)
            .map(s => this.getStockDisplayedData(s));
        const visibleColumnNames = this.state.columns.filter(c => c.visible).map(c => c.name);
        const tickerSortedStocks = this.state.stocks.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));
        return (
            <div className="App">
                <Header/>
                <HighlightedStats stocks={this.state.stocks}/>
                <FiltersContainer columns={this.state.columns} stocks={tickerSortedStocks} onColumnChange={this.invertColumnVisibility} onStockChange={this.invertStockVisibility}/>
                <StockTable onHeaderClick={this.sortByAttribute} stocks={visibleStocksData} columnTitles={visibleColumnNames}/>
                <Footer/>
            </div>
        );
    }

}