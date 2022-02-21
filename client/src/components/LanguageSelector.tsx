import React, { FunctionComponent, useCallback } from "react";
import i18n from "i18next";
import "flag-icons/css/flag-icons.min.css";

interface LanguageSelectorProps {
    languageCode: string;
    countryCode: string;
}

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({ languageCode, countryCode }) => {
    const onChange = useCallback((languageCode: string) => {
        i18n.changeLanguage(languageCode).catch((e) => console.error(`Error while changing language: ${e}`));
    }, []);
    return <span className={`language-select fi fi-${countryCode}`} onClick={() => onChange(languageCode)} />;
};
