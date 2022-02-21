import i18next from "i18next";
import React, { FunctionComponent } from "react";
import "../style/Header.css";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export const Header: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <header>
            {i18next.language.substring(0, 2) !== "en" ? (
                <LanguageSelector languageCode={"en"} countryCode={"gb"} />
            ) : (
                <LanguageSelector languageCode={"et"} countryCode={"ee"} />
            )}
            <img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" alt="Logo" />
            <h1>{t("title")}</h1>
            <h2>{t("tagline")}</h2>
        </header>
    );
};
