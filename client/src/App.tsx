import "./style/App.css";
import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import Header from "./components/Header";
import StockTable from "./components/StockTable";
import {Column} from "./types/Column";
import FiltersContainer from "./components/filtering/FiltersContainer";
import HighlightedStats from "./components/HighlightedStats";
import Footer from "./components/Footer";
import {FinancialData} from "./types/FinancialData";
import {IndexType} from "./types/IndexType";
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE || "");
    ReactGA.pageview(window.location.pathname + window.location.search);
}

interface AppState {
    stocks: Stock[],
    columns: Column[],
    sortingStocksBy: string,
    sortingOrder: ("asc" | "desc"),
    selectedYear: number,
    timeFetched: string,
    index: IndexType,
}

const API_URL = process.env.REACT_APP_API_URL;

export default class App extends Component<object, AppState> {
    titles: string[];
    yearlyFinancialData: string[];

    constructor(props: object) {
        super(props);
        this.titles = [
            "id",
            "ticker",
            "name",
            "isin",
            "priceEarningTtm",
            "priceBook",
            "priceSalesTtm",
            "revenueGrowthThreeYearAvg",
            "operatingMarginTtm",
            "netMarginTtm",
            "roeTtm",
            "debtEquity",
            "revenue",
            "operatingIncome",
            "netIncome",
            "earningsPerShare",
            "dilutedSharesOutstanding",
            "currentAssets",
            "nonCurrentAssets",
            "totalAssets",
            "currentLiabilities",
            "totalLiabilities",
            "totalEquity",
            "operatingCashFlow",
            "capitalExpenditure",
            "freeCashFlow",
        ];

        this.yearlyFinancialData = [
            "revenue", "operatingIncome", "netIncome", "earningsPerShare", "dilutedSharesOutstanding", "currentAssets",
            "nonCurrentAssets", "totalAssets", "currentLiabilities", "totalLiabilities", "totalEquity", "operatingCashFlow",
            "capitalExpenditure", "freeCashFlow",
        ];

        const narrowView = window.matchMedia("(max-width: 1100px)");

        const defaultDisplayedStats = narrowView.matches ? ["name", "priceBook", "priceSalesTtm", "roeTtm",
            "debtEquity", "revenue", "netIncome", "capitalExpenditure"] : ["ticker", "name", "priceBook", "priceSalesTtm", "operatingMarginTtm", "roeTtm",
            "debtEquity", "revenue", "netIncome", "capitalExpenditure", "freeCashFlow"];


        const columns: Column[] = this.titles
            .map(title => ({title: title, visible: defaultDisplayedStats.includes(title)}));

        this.state = {
            stocks: [], columns, sortingStocksBy: "invalid", sortingOrder: "desc", selectedYear: 2019,
            timeFetched: "", index: {id: -1, start: "", end: "", name: "", ticker: "", changePercent: 0}
        };
    }

    componentDidMount(): void {
        fetch(API_URL + "/stocks")
            .then(res => res.json())
            .then((data) => {
                const stocks: Stock[] = data.stocks.map((d: Stock) => ({...d, visible: true}));
                const index = data.index;
                stocks.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({
                    stocks, timeFetched: data.timeFetched, sortingStocksBy: "name", sortingOrder: "desc", index: index
                });
            })
            .catch(e => console.log(e));
    }

    getStockDisplayedData = (stock: Stock): object => {
        const copy = {...stock, ...stock.keyStats, ...this.getDisplayedFinancialData(stock)};
        Object.keys(copy).filter(k => !(this.titles.includes(k))).forEach(k => delete copy[k]); // delete attributes that are never displayed in table

        this.state.columns.filter(c => !c.visible && c.title !== "id") // delete attributes that are currently not visible except id
            .map(c => c.title)
            .forEach(k => delete copy[k]);

        this.state.columns.filter(c => c.visible) // add missing attributes as nulls
            .map(c => c.title)
            .filter(k => copy[k] === undefined)
            .forEach(k => copy[k] = null);
        return copy;
    };

    invertColumnVisibility = (event): void => {
        const columns: Column[] = this.state.columns.map(col => (`checkbox-${col.title}` === event.target.id ? {
            ...col,
            visible: !col.visible
        } : col));
        this.setState({columns});
    };

    invertCountryVisibility = (event): void => {
        const stocks: Stock[] = this.state.stocks.map(s => ((`checkbox-${s.isin}`).startsWith(event.target.id) ? ({
            ...s,
            visible: event.target.checked
        }) : s));
        this.setState({stocks});
    };

    invertStockVisibility = (event): void => {
        const stocks: Stock[] = this.state.stocks.map(stock => (`checkbox-${stock.name}` === event.target.id ? {
            ...stock,
            visible: !stock.visible
        } : stock));
        this.setState({stocks});
    };

    getDisplayedFinancialData = (stock: Stock): FinancialData | undefined => stock.financialData.filter(f => f.year === this.state.selectedYear).pop();

    sortStocksByAttribute = (columnTitle: string): void => {
        const stocks: Stock[] = this.state.stocks.slice();
        if (columnTitle === this.state.sortingStocksBy) { // already sorting table by this attribute, reverse the order
            stocks.reverse();
            this.setState({stocks, sortingOrder: this.state.sortingOrder === "desc" ? "asc" : "desc"});
        } else {
            let sortedStocks: Stock[] = stocks
                .filter(s => s[columnTitle] || s.keyStats[columnTitle] || this.getDisplayedFinancialData(s)?.[columnTitle]) // don't sort stocks where sorting attribute is not available
                .sort((a, b) => this.compareStocksByAttribute(a, b, columnTitle));
            sortedStocks = [...stocks.filter(s => !s[columnTitle] && !s.keyStats[columnTitle] && !this.getDisplayedFinancialData(s)?.[columnTitle]),
                ...sortedStocks]; // add null/undefined to beginning of sorted sequence
            this.setState({stocks: sortedStocks, sortingStocksBy: columnTitle, sortingOrder: "desc"});
        }
    };

    compareStocksByAttribute = (a: Stock, b: Stock, attribute: string): number => {
        const aStockAttribute: string = a[attribute] ? a[attribute] : "";
        const bStockAttribute: string = b[attribute] ? b[attribute] : "";

        return a.keyStats[attribute] - b.keyStats[attribute]
            || this.getDisplayedFinancialData(a)?.[attribute] - this.getDisplayedFinancialData(b)?.[attribute]
            || aStockAttribute.localeCompare(bStockAttribute);
    };

    getVisibleYears = (): number[] => {
        const visibleYears: number[] = this.state.stocks.filter(s => s.visible)
            .map(s => s.financialData)
            .flat()
            .filter(f => Object.values(f) // object has non-null values in more than column (year is always non-null)
                .reduce((previousValue, currentValue) => (currentValue !== null ? previousValue + 1 : previousValue), 0) > 1)
            .map(f => f.year);
        const visibleYearsNoDuplicates = Array.from(new Set(visibleYears)); // get rid of duplicates
        visibleYearsNoDuplicates.sort();
        return visibleYearsNoDuplicates;
    };

    selectYear = (event): void => {
        const year: number = Number.parseInt(event.target.id.replace("radio-", ""));
        let sortingBy = this.state.sortingStocksBy;
        if (this.yearlyFinancialData.includes(this.state.sortingStocksBy)) {
            sortingBy = "invalid";
        }
        this.setState({selectedYear: year, sortingStocksBy: sortingBy});
    };

    render() {
        const visibleStocksData = this.state.stocks
            .filter(s => s.visible)
            .map(s => this.getStockDisplayedData(s));
        const visibleColumns = this.state.columns.filter(c => c.visible).map(c => c.title);
        const tickerSortedStocks = this.state.stocks.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));
        return (
            <div className="App">
                <Header/>
                <HighlightedStats stocks={this.state.stocks} index={this.state.index}/>
                <FiltersContainer
                    columns={this.state.columns} stocks={tickerSortedStocks} years={this.getVisibleYears()}
                    selectedYear={this.state.selectedYear}
                    onColumnChange={this.invertColumnVisibility}
                    onStockChange={this.invertStockVisibility}
                    onYearChange={this.selectYear}
                    financialDataColumnTitles={this.yearlyFinancialData}
                    onCountryChange={this.invertCountryVisibility}
                />
                <StockTable
                    onHeaderClick={this.sortStocksByAttribute} stockDisplayValues={visibleStocksData}
                    sortingBy={this.state.sortingStocksBy} sortingOrder={this.state.sortingOrder}
                    columnTitles={visibleColumns} timeFetched={this.state.timeFetched}
                />
                <Footer/>
            </div>
        );
    }
}
