import { FunctionComponent } from "react";
import i18next from "i18next";
import "../style/Footer.css";
import { useTranslation } from "react-i18next";

export const Footer: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <img
                src={`${process.env.PUBLIC_URL}/footer-${i18next.language.substring(0, 2)}.png`}
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
};
