import "./style/App.css"
import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import {Header} from "./components/Header";
import {StockTable} from "./components/StockTable";
import {Column} from "./types/Column";
import {FiltersContainer} from "./components/filtering/FiltersContainer";
import {HighlightedStats} from "./components/HighlightedStats";
import {Footer} from "./components/Footer";
import {FinancialData} from "./types/FinancialData";

interface AppState {
    stocks: Stock[],
    columns: Column[],
    sortingStocksBy: string,
    sortingOrder: ("asc" | "desc"),
    selectedYear: number,
}

export default class App extends Component<object, AppState> {

    titles: object;
    yearlyData: string[];

    constructor(props: object) {
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

        this.yearlyData = [
            "revenue", "operatingIncome", "netIncome", "earningsPerShare", "dilutedSharesOutstanding", "currentAssets",
            "nonCurrentAssets", "totalAssets", "currentLiabilities", "totalLiabilities", "totalEquity", "operatingCashFlow",
            "capitalExpenditure", "freeCashFlow"
        ];

        const columns : Column[] = Object.entries(this.titles)
            .map(title => ({title: title[0], visible: title[0] !== 'id', name: title[1]}));
        this.state = {stocks: [], columns: columns, sortingStocksBy: "ticker", sortingOrder: "desc", selectedYear: 2019};
    }

    componentDidMount(): void {
        fetch("http://localhost:12345/stocks")
            .then(res => res.json())
            .then((data) => {
                const stocks : Stock[] = data.map((d: Stock) => ({...d, visible: true}));
                this.setState({stocks: stocks})
            })
            .catch(e => console.log(e));
    }

    getStockDisplayedData = (stock: Stock) : object => {
        const copy : object = Object.assign({}, stock);
        Object.assign(copy, stock.keyStats);
        Object.assign(copy, this.getDisplayedFinancialData(stock));
        Object.keys(copy).filter(k => !(k in this.titles)).forEach(k => delete copy[k]); // delete attributes that are never displayed in table

        this.state.columns.filter(c => !c.visible && c.title !== "id") // delete attributes that are currently not visible except id
            .map(c => c.title)
            .forEach(k => delete copy[k]);

        this.state.columns.filter(c => c.visible) // add missing attributes as nulls
            .map(c => c.title)
            .filter(k => copy[k] === undefined)
            .forEach(k => copy[k] = null);
        return copy;
    };

    invertColumnVisibility = (event) : void => {
        const columns : Column[] = this.state.columns.map(col => "checkbox-" + col.name === event.target.id ? {...col, visible: !col.visible} : col);
        this.setState({columns: columns});
    };

    invertCountryVisibility = (event) : void => {
        const stocks : Stock[] = this.state.stocks
            .map(s => ("checkbox-" + s.isin).startsWith(event.target.id) ? ({...s, visible: event.target.checked}) : s);
        this.setState({stocks: stocks});
    };

    invertStockVisibility = (event) : void => {
        const stocks : Stock[] = this.state.stocks.map(stock => "checkbox-" + stock.name === event.target.id ? {...stock, visible: !stock.visible} : stock);
        this.setState({stocks: stocks});
    };

    getDisplayedFinancialData = (stock : Stock) : FinancialData | undefined => {
        return stock.financialData.filter(f => f.year === this.state.selectedYear).pop();
    };

    sortStocksByAttribute = (columnTitle : string) : void => {
        const stocks : Stock[] = this.state.stocks.slice();
        const attribute : string = Object.entries(this.titles).filter(e => e[1] === columnTitle)
            .map(e => e[0])[0];
        if (attribute === this.state.sortingStocksBy) { // already sorting table by this attribute, reverse the order
            this.setState({stocks: stocks.reverse(), sortingOrder: this.state.sortingOrder === "desc" ? "asc" : "desc"});
        } else {
            let sortedStocks: Stock[] = stocks
                .filter(s => s.keyStats[attribute] || this.getDisplayedFinancialData(s)?.[attribute]) // don't sort stocks where sorting attribute is not available
                .sort((a, b) => this.compareStocksByAttribute(a, b, attribute));
            sortedStocks = [...stocks.filter(s => !s.keyStats[attribute] && !this.getDisplayedFinancialData(s)?.[attribute]),
                ...sortedStocks]; // add null/undefined to beginning of sorted sequence
            this.setState({stocks: sortedStocks, sortingStocksBy: attribute, sortingOrder: "desc"})
        }
    };

    compareStocksByAttribute = (a : Stock, b : Stock, attribute : string) : number => {
        const aStockAttribute : string = a[attribute] ? a[attribute] : "";
        const bStockAttribute : string = b[attribute] ? b[attribute] : "";

        return a.keyStats[attribute] - b.keyStats[attribute] ||
            this.getDisplayedFinancialData(a)?.[attribute] - this.getDisplayedFinancialData(b)?.[attribute] ||
            aStockAttribute.localeCompare(bStockAttribute)
    };

    getVisibleYears = () : number[] => {
        const visibleYears : number[] = this.state.stocks.filter(s => s.visible)
            .map(s => s.financialData)
            .flat()
            .filter(f => Object.values(f) // object has non-null values in more than column (year is always non-null)
                .reduce((previousValue, currentValue) => currentValue !== null ? previousValue + 1: previousValue, 0) > 1)
            .map(f => f.year);
        const visibleYearsNoDuplicates = Array.from(new Set(visibleYears)); // get rid of duplicates
        visibleYearsNoDuplicates.sort();
        return visibleYearsNoDuplicates;
    };

    selectYear = (event) : void => {
        const year : number = Number.parseInt(event.target.id.replace("radio-", ""));
        let sortingBy = this.state.sortingStocksBy;
        if (this.yearlyData.includes(this.state.sortingStocksBy)) {
            sortingBy = "invalid";
        }
        this.setState({selectedYear: year, sortingStocksBy: sortingBy})
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
                <FiltersContainer columns={this.state.columns} stocks={tickerSortedStocks} years={this.getVisibleYears()}
                                  selectedYear={this.state.selectedYear}
                                  onColumnChange={this.invertColumnVisibility}
                                  onStockChange={this.invertStockVisibility}
                                  onYearChange={this.selectYear}
                                  onCountryChange={this.invertCountryVisibility}/>
                <StockTable onHeaderClick={this.sortStocksByAttribute} stockDisplayValues={visibleStocksData}
                            sortingBy={this.titles[this.state.sortingStocksBy]} sortingOrder={this.state.sortingOrder}
                            columnTitles={visibleColumnNames}/>
                <Footer/>
            </div>
        );
    }

}