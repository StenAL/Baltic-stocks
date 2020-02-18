import React from "react";
import "../style/HighlightedStats.css"
export class HighlightedStats extends React.Component<any, any> {

    render() {
        return (
            <div className={"highlightContainer"}>
                <div className={"highlightedStat"}>
                    <h2>200</h2>
                    <p>miljonit eurot kasumit teenisid Balti põhinimekirja aktsiad viimase 12 kuuga</p>
                </div>
                <div className={"highlightedStat"}>
                    <h2>1300 €</h2>
                    <p>investeeringu väärtus, kui oleksid ostnud 12 kuud tagasi 1000 € eest aktisaid</p>
                </div>
            </div>
        );
    }
}