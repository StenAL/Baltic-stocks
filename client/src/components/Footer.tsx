import React from "react";
import i18next from "i18next";
import "../style/Footer.css";
import { withTranslation } from "react-i18next";

class Footer extends React.Component<any, object> {
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
