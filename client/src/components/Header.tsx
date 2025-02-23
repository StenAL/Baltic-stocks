import { FunctionComponent } from "react";
import "../style/Header.css";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export const Header: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    return (
        <header>
            {i18n.language.substring(0, 2) === "en" ? (
                <LanguageSelector languageCode={"et"} countryCode={"ee"} />
            ) : (
                <LanguageSelector languageCode={"en"} countryCode={"gb"} />
            )}
            <img src={import.meta.env.BASE_URL + "/logo.png"} className="logo" alt="Logo" />
            <h1>{t("title")}</h1>
            <h2>{t("tagline")}</h2>
        </header>
    );
};
