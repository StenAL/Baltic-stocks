import { FunctionComponent } from "react";
import "../style/Header.css";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export const Header: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    return (
        <header>
            <title>{t("title")}</title>
            {i18n.language.substring(0, 2) === "en" ? (
                <LanguageSelector languageCode={"et"} countryCode={"ee"} />
            ) : (
                <LanguageSelector languageCode={"en"} countryCode={"gb"} />
            )}
            <img src={logo} className="logo" alt="Logo" />
            <h1>{t("title")}</h1>
            <h2>{t("tagline")}</h2>
        </header>
    );
};
