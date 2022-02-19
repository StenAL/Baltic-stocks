import React from "react";
import i18n from "i18next";
import "flag-icons/css/flag-icons.min.css";
interface LanguageSelectorProps {
    languageCode: string;
    countryCode: string;
}

export class LanguageSelector extends React.Component<
    LanguageSelectorProps,
    object
> {
    onChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    render() {
        return (
            <span
                className={`language-select fi fi-${this.props.countryCode}`}
                onClick={() => this.onChange(this.props.languageCode)}
            />
        );
    }
}
