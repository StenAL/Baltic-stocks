import "./style/App.css"
import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import {Header} from "./components/Header";
import {StockTable} from "./components/StockTable";
import {Column} from "./types/Column";
import {FiltersContainer} from "./components/filtering/FiltersContainer";
import {HighlightedStats} from "./components/HighlightedStats";
import {Footer} from "./components/Footer";

interface AppState {
    stocks: Stock[],
    columns: Column[],
    sortingStocksBy: string,
    financialDataYear: number,
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
            revenue: "Tulu",
            netIncome: "Kasum",
        };
        const columns = Object.entries(this.titles).map(title => ({title: title[0], visible: true, name: title[1]}));
        columns[0].visible = false; // don't show id
        this.state = {stocks: [], columns: columns, sortingStocksBy: "ticker", financialDataYear: 2017};

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
        Object.assign(copy, this.getDisplayedFinancialData(stock));
        Object.keys(copy).filter(k => !(k in this.titles)).forEach(k => delete copy[k]);
        this.state.columns.filter(c => !c.visible && c.title !== "id").map(c => c.title).forEach(k => delete copy[k]);
        return copy;
    };

    invertColumnVisibility = (event) => {
        const columns = this.state.columns.map(col => "checkbox-" + col.name === event.target.id ? {...col, visible: !col.visible} : col);
        this.setState({columns: columns});
    };

    invertCountryVisibility = (event) => {
        const stocks = this.state.stocks
            .map(s => ("checkbox-" + s.isin).startsWith(event.target.id) ? ({...s, visible: event.target.checked}) : s);
        this.setState({stocks: stocks});
    };

    invertStockVisibility = (event) => {
        const stocks = this.state.stocks.map(stock => "checkbox-" + stock.name === event.target.id ? {...stock, visible: !stock.visible} : stock);
        this.setState({stocks: stocks});
    };

    getDisplayedFinancialData = (stock) => {
        return stock.financialData.filter(f => f.year === this.state.financialDataYear).pop();
    };

    sortByAttribute = (columnTitle) => {
        const stocks = this.state.stocks.slice();
        const attribute = Object.entries(this.titles).filter(e => e[1] === columnTitle)
            .map(e => e[0])[0];
        if (attribute === this.state.sortingStocksBy) {
            this.setState({stocks: stocks.reverse()});
        } else {
            let sortedStocks: Stock[] = stocks
                .filter(s => s.keyStats[attribute] !== null && this.getDisplayedFinancialData(s)?.[attribute] !== null)
                .sort((a, b) => this.stockSortByAttribute(a, b, attribute));
            sortedStocks = [...stocks.filter(s => s.keyStats[attribute] === null || this.getDisplayedFinancialData(s)?.[attribute] === null), ...sortedStocks];
            this.setState({stocks: sortedStocks, sortingStocksBy: attribute})
        }
    };

    stockSortByAttribute = (a : Stock, b : Stock, attribute : string) : number => {
        const aStockAttribute = a[attribute] ? a[attribute] : "";
        const bStockAttribute = b[attribute] ? b[attribute] : "";

        return a.keyStats[attribute] - b.keyStats[attribute] ||
            this.getDisplayedFinancialData(a)?.[attribute] - this.getDisplayedFinancialData(b)?.[attribute] ||
            aStockAttribute.localeCompare(bStockAttribute)
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
                <FiltersContainer columns={this.state.columns} stocks={tickerSortedStocks}
                                  onColumnChange={this.invertColumnVisibility}
                                  onStockChange={this.invertStockVisibility}
                                  onCountryChange={this.invertCountryVisibility}/>
                <StockTable onHeaderClick={this.sortByAttribute} stocks={visibleStocksData}
                            columnTitles={visibleColumnNames}/>
                <Footer/>
            </div>
        );
    }

}