import React from "react";
import "../style/Footer.css";

export class Footer extends React.Component<object, object> {
    render() {
        return (
            <footer>
                <img src={process.env.PUBLIC_URL + "/footer.png"} className="footer" alt="text" />
          </footer>
        );
    }
}
