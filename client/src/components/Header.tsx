import i18next from "i18next";
import React from "react";
import "../style/Header.css";
import { withTranslation } from 'react-i18next';
import {LanguageSelector} from "./LanguageSelector";

class Header extends React.Component<any, object> {
    render() {
        const { t } = this.props;
        return (
            <header>
                { i18next.language !== "en" ?
                <LanguageSelector languageCode={"en"} countryCode={"gb"}/> :
                < LanguageSelector languageCode={"et"} countryCode={"ee"}/>
                }
                <img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" alt="Logo" />
                <h1>{t('title')}</h1>
                <h2>{t('tagline')}</h2>
          </header>
        );
    }
}

export default withTranslation()(Header);
