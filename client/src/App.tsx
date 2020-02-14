import React, {Component} from 'react';
import {Stock} from "./types/Stock";

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
                console.log(data);
                this.setState({stocks: data})
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="App">
                <p>Reacc</p>
                {JSON.stringify(this.state.stocks)}
            </div>
        );
    }

}