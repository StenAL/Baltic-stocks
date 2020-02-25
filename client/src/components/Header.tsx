import React from "react";
// @ts-ignore
import logo from "../assets/logo.png";
import "../style/Header.css";

export class Header extends React.Component<object, object> {
    render() {
        return (
            <header>
                <img src={logo} className="logo" alt="Logo" />
                <h1>Pealkiri</h1>
          </header>
        );
    }
}
