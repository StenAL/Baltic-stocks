import React from "react";
import "../style/Footer.css";

// @ts-ignore
import footer from "../assets/footer.png";

export class Footer extends React.Component<object, object> {
    render() {
        return (
            <footer>
                <img src={footer} className="footer" alt="text" />
          </footer>
        );
    }
}
