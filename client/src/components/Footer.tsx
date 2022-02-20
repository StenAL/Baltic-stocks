import React from "react";
import i18next from "i18next";
import "../style/Footer.css";
import { WithTranslation, withTranslation } from "react-i18next";

type FooterProps = WithTranslation;

class Footer extends React.Component<FooterProps> {
    render() {
        const { t } = this.props;
        return (
            <footer>
                <img
                    src={`${
                        process.env.PUBLIC_URL
                    }/footer-${i18next.language.substring(0, 2)}.png`}
                    className="footer"
                    alt="Skyline view of Tallinn"
                />
                <p
                    dangerouslySetInnerHTML={{
                        __html: t("open-source", {
                            interpolation: { escapeValue: false },
                        }),
                    }}
                />
            </footer>
        );
    }
}

export default withTranslation()(Footer);
