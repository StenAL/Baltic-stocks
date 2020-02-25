import React from "react";
import "../style/Footer.css";

// @ts-ignore
import banner from "../assets/banner_w.png";

export class Footer extends React.Component<object, object> {
    render() {
        return (
            <footer>
                <img src={banner} className="banner" alt="text" />
          </footer>
        );
    }
}
