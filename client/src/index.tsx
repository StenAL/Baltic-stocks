import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./i18n";

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
