import { FunctionComponent } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
    languageCode: string;
    countryCode: string;
}

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({ languageCode, countryCode }) => {
    const { i18n } = useTranslation();
    return (
        <span
            className={`language-select fi fi-${countryCode}`}
            onClick={() =>
                i18n.changeLanguage(languageCode).catch((e) => console.error(`Error while changing language: ${e}`))
            }
        />
    );
};
