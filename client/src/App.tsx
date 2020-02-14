import React, {Component} from 'react';
import {Stock} from "./types/Stock";
import {Header} from "./components/Header";
import {StockTable} from "./components/StockTable";
import "./style/App.css"

interface AppState {
    stocks: Stock[];
}

export default class App extends Component<object, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {stocks: []};
    }

    componentDidMount(): void {
        fetch("http://localhost:12345/stocks/")
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                const stocks = data.map((d: Stock) => ({...d, visible: true}));
                this.setState({stocks: stocks})
            })
            .catch(e => console.log(e));
    }

    render() {
        const visibleStocks = this.state.stocks.filter(s => s.visible);
        return (
            <div className="App">
                <Header/>
                <StockTable stocks={visibleStocks}/>
            </div>
        );
    }

}